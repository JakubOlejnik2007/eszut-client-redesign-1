import { AuthenticationResult, EventType, PublicClientApplication } from "@azure/msal-browser";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom/dist";
import urls from "../utils/urls";
import EUserRole from "../types/userroles.enum";
import axios from "axios";
import config, { msalConfig } from "../utils/config";
import IUser from "../types/user.interface";





const AuthContext = createContext<{
    user: IUser | null,
    login: () => void,
    logout: () => void,
    isLoading: boolean
}>({
    user: null,
    login: () => { },
    logout: () => { },
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

            const response = await axios.get(`${config.backend}${urls.backend.auth.getUserRole}`, {
                headers: {
                    Authorization: `Bearer ${loginResponse.accessToken}`,
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
