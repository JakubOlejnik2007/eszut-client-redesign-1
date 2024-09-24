import { AuthenticationResult, EventType, PublicClientApplication } from "@azure/msal-browser";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";
import urls from "../utils/urls";
import EUserRole from "../types/userroles.enum";
import config, { msalConfig } from "../utils/config";
import IUser from "../types/user.interface";

const AuthContext = createContext<{
    user: IUser | null,
    login: () => void,
    logout: () => void,
    acquireToken: () => Promise<string | null>,
    isLoading: boolean
}>({
    user: null,
    login: () => { },
    logout: () => { },
    acquireToken: async () => null,
    isLoading: true
});

export const AuthData = () => useContext(AuthContext);

const msalInstance = new PublicClientApplication(msalConfig);

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeMsal = async () => {
            await msalInstance.initialize();
            try {
                msalInstance.addEventCallback((event) => {
                    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
                        const authResult = event.payload as AuthenticationResult;
                        setUser({
                            AuthRole: authResult,
                            role: EUserRole.GUEST
                        });
                    }
                });

                const accounts = msalInstance.getAllAccounts();
                if (accounts.length > 0) {
                    msalInstance.setActiveAccount(accounts[0]);
                }

                setIsInitialized(true);
                setIsLoading(false);
            } catch (error) {
                console.error('Błąd podczas inicjalizacji MSAL', error);
                setIsLoading(false);
            }
        };

        initializeMsal();
    }, []);

    useEffect(() => {
        const userDataFromSession = sessionStorage.getItem("AuthData");
        if (userDataFromSession) {
            const parsedUserData = JSON.parse(userDataFromSession);
            setUser(parsedUserData);
        }
        setIsLoading(false);
    }, []);

    const acquireToken = async (): Promise<string | null> => {
        try {
            const activeAccount = msalInstance.getActiveAccount();
            if (!activeAccount) {
                throw new Error("Brak aktywnego konta użytkownika");
            }

            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ["api://e4c482a1-9923-4462-bf05-b70d64942c19/App"],
                account: activeAccount
            });

            setUser((prevState) => ({
                ...prevState,
                AuthRole: {
                    ...prevState?.AuthRole,
                    accessToken: tokenResponse.accessToken,
                    expiresOn: tokenResponse.expiresOn
                }
            }) as IUser);

            sessionStorage.setItem("AuthData", JSON.stringify({
                ...user,
                AuthRole: {
                    ...user?.AuthRole,
                    accessToken: tokenResponse.accessToken,
                    expiresOn: tokenResponse.expiresOn
                }
            }));

            return tokenResponse.accessToken;
        } catch (error) {
            console.error('Błąd podczas odświeżania tokena', error);
            return null;
        }
    };

    const login = async () => {
        if (!isInitialized) {
            console.error('MSAL nie jest jeszcze zainicjalizowany');
            return;
        }

        try {
            const loginResponse = await msalInstance.loginPopup({
                scopes: ["api://e4c482a1-9923-4462-bf05-b70d64942c19/App"],
            });
            setUser({
                AuthRole: loginResponse,
                role: EUserRole.GUEST
            });

            const token = loginResponse.accessToken;
            const response = await axios.get(`${config.backend}${urls.backend.auth.getUserRole}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser((prevState) => ({
                ...prevState,
                role: response.data.role as EUserRole,
                AuthRole: prevState?.AuthRole ?? undefined,
            }) as IUser);

            sessionStorage.setItem("AuthData", JSON.stringify({
                AuthRole: loginResponse,
                role: response.data.role as EUserRole
            }));

            navigate(urls.client.reportProblem);
        } catch (error) {
            console.error('Błąd podczas logowania', error);
        }
    };

    const logout = async () => {
        sessionStorage.removeItem("AuthData");
        setUser(null);
        await msalInstance.logoutPopup();
        navigate("/");
    };

    useEffect(() => {
        const intervalId = setInterval(async () => {
            console.log("Token refresh")
            const result = await acquireToken();
            console.log(result)
        }, 15 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, acquireToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
