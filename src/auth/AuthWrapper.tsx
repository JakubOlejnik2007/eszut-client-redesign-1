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
            const accounts = msalInstance.getAllAccounts();

            if (accounts.length > 0) {
                // Ustaw aktywne konto w MSAL
                msalInstance.setActiveAccount(accounts[0]);

                // Sprawdź, czy token jest nadal ważny
                const tokenExpiry = parsedUserData?.AuthRole?.expiresOn;
                if (tokenExpiry) {
                    const tokenExpirationDate = new Date(tokenExpiry);
                    const currentTime = new Date();

                    if (currentTime > tokenExpirationDate) {
                        // Token jest przeterminowany, trzeba go odświeżyć
                        acquireToken().then((newToken) => {
                            if (newToken) {
                                console.log("Token został pomyślnie odświeżony.");
                            } else {
                                console.error("Nie udało się odświeżyć tokena.");
                                logout();
                            }
                        });
                    } else {
                        // Token jest ważny, ustaw użytkownika
                        setUser(parsedUserData);
                    }
                }
            }
        } else {
            setIsLoading(false);
        }
    }, [isInitialized]);


    const acquireToken = async (): Promise<string | null> => {
        try {
            const activeAccount = msalInstance.getActiveAccount();
            if (!activeAccount) {
                throw new Error("Brak aktywnego konta użytkownika");
            }

            // Sprawdzenie, czy token już istnieje
            const currentUser = user;
            const tokenExpiry = currentUser?.AuthRole?.expiresOn;
            const currentTime = new Date();

            // Jeśli token istnieje i jest przeterminowany, odśwież token
            if (tokenExpiry) {
                const tokenExpirationDate = new Date(tokenExpiry);
                if (currentTime > tokenExpirationDate) {
                    console.log('Token jest przeterminowany, odświeżanie...');
                    // Próbujemy odświeżyć token
                    const refreshedTokenResponse = await msalInstance.acquireTokenSilent({
                        scopes: ["api://e4c482a1-9923-4462-bf05-b70d64942c19/App"],
                        account: activeAccount
                    });

                    const updatedUser = {
                        ...user,
                        AuthRole: {
                            ...user?.AuthRole,
                            accessToken: refreshedTokenResponse.accessToken,
                            expiresOn: refreshedTokenResponse.expiresOn
                        }
                    };

                    setUser(updatedUser as IUser);
                    sessionStorage.setItem("AuthData", JSON.stringify(updatedUser));

                    return refreshedTokenResponse.accessToken;
                }
            }

            // Jeśli token jeszcze jest ważny, zwróć istniejący
            if (currentUser?.AuthRole?.accessToken) {
                return currentUser.AuthRole.accessToken;
            }

            // Jeśli nie ma tokena lub token wygasł, spróbuj pozyskać nowy token
            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ["api://e4c482a1-9923-4462-bf05-b70d64942c19/App"],
                account: activeAccount
            });

            const updatedUser = {
                ...user,
                AuthRole: {
                    ...user?.AuthRole,
                    accessToken: tokenResponse.accessToken,
                    expiresOn: tokenResponse.expiresOn
                }
            };

            setUser(updatedUser as IUser);
            sessionStorage.setItem("AuthData", JSON.stringify(updatedUser));

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, acquireToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
