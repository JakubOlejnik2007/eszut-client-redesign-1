import { AuthenticationResult, EventType, PublicClientApplication } from "@azure/msal-browser";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import urls from "../utils/urls";
import EUserRole from "../types/userroles.enum";
import config, { msalConfig } from "../utils/config";
import IUser from "../types/user.interface";

const AuthContext = createContext<{
    user: IUser | null,
    accessToken: string | null,
    login: () => void,
    logout: () => void,
    acquireToken: () => Promise<string | null>,
    isLoading: boolean
}>({
    user: null,
    accessToken: null,
    login: () => { },
    logout: () => { },
    acquireToken: async () => null,
    isLoading: true
});

export const AuthData = () => useContext(AuthContext);

const msalInstance = new PublicClientApplication(msalConfig);

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (accessToken) {
            const decodedToken: any = JSON.parse(atob(accessToken.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < currentTime) {
                refreshAccessToken();
            }
        }

        if (!accessToken && refreshToken) refreshAccessToken();
    });

    useEffect(() => {
        const initializeMsal = async () => {
            await msalInstance.initialize();
            try {

                const accounts = msalInstance.getAllAccounts();
                if (accounts.length > 0) {
                    msalInstance.setActiveAccount(accounts[0]);
                }

                setIsInitialized(true);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        initializeMsal();
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const sessionData = sessionStorage.getItem("AuthData");
                if (sessionData) {
                    const parsedData = JSON.parse(sessionData);
                    setUser(parsedData.user);
                    refreshAccessToken();
                    setRefreshToken(parsedData.refreshToken);
                }

                setIsInitialized(true);
                setIsLoading(false);
            } catch (error) {
                console.error("Initialization error", error);
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    useEffect(() => {
        if (isInitialized) {
            const interval = setInterval(() => {
                refreshAccessToken();
            }, 300000);
            return () => clearInterval(interval);
        }
    }, [isInitialized, refreshToken]);

    const setActiveAccountIfNeeded = () => {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0 && !msalInstance.getActiveAccount()) {
            msalInstance.setActiveAccount(accounts[0]);
        }
    };

    const acquireToken = async (): Promise<string | null> => {
        try {
            setActiveAccountIfNeeded();
            const activeAccount = msalInstance.getActiveAccount();
            if (!activeAccount) {
                console.error("No active user account.");
                return null;
            }

            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ["api://e4c482a1-9923-4462-bf05-b70d64942c19/App"],
                account: activeAccount,
                forceRefresh: true,
            });

            const serverResponse = await axios.get(`${config.backend}${urls.backend.auth.setTokens}`, {
                params: { MSAL_TOKEN: tokenResponse.accessToken },
            });

            setUser(serverResponse.data.user);
            setRefreshToken(serverResponse.data.refreshToken);

            sessionStorage.setItem("AuthData", JSON.stringify({
                user: serverResponse.data.user,
                refreshToken: serverResponse.data.refreshToken,
            }));

            return serverResponse.data.accessToken;
        } catch (error) {
            console.error("Error acquiring token", error);
            return null;
        }
    };

    const refreshAccessToken = async (): Promise<void> => {
        if (!refreshToken) {
            console.error("No refresh token available.");
            return;
        }

        try {
            const response = await axios.get(`${config.backend}${urls.backend.auth.refreshToken}`, {
                params: { REFRESH_TOKEN: refreshToken },
            });

            setAccessToken(response.data.accessToken);

            sessionStorage.setItem("AuthData", JSON.stringify({
                user,
                refreshToken,
            }));
        } catch (error) {
            console.error("Error refreshing access token", error);
        }
    };

    const login = async () => {
        if (!isInitialized) {
            console.error("MSAL is not initialized yet. Please wait.");
            return;
        }

        try {
            const loginResponse = await msalInstance.loginPopup({
                scopes: ["api://e4c482a1-9923-4462-bf05-b70d64942c19/App"],
            });

            msalInstance.setActiveAccount(loginResponse.account);

            const serverResponse = await axios.get(`${config.backend}${urls.backend.auth.setTokens}`, {
                params: { MSAL_TOKEN: loginResponse.accessToken },
            });

            setUser({ ...serverResponse.data.user });
            setAccessToken(serverResponse.data.accessToken);
            setRefreshToken(serverResponse.data.refreshToken);

            sessionStorage.setItem("AuthData", JSON.stringify({
                user: serverResponse.data.user,
                refreshToken: serverResponse.data.refreshToken,
                accessToken: serverResponse.data.accessToken,
            }));
        } catch (error) {
            console.error("Login error", error);
        }
    };


    const logout = () => {
        sessionStorage.removeItem("AuthData");
        setUser(null);
        setRefreshToken(null);
        msalInstance.logoutPopup();
        navigate("/");
    };



    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout, acquireToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
