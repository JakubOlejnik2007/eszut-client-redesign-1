import { AuthenticationResult, EventType, PublicClientApplication } from "@azure/msal-browser";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom/dist";
import urls from "../utils/urls";
import EUserRole from "../types/userroles.enum";
import axios from "axios";
import config from "../utils/config";

const msalConfig = {
    auth: {
        clientId: 'e4c482a1-9923-4462-bf05-b70d64942c19',
        authority: 'https://login.microsoftonline.com/84867874-5f7d-4b12-b070-d6cea5a3265e',
        redirectUri: 'http://localhost:5173',
    },
};

interface IUser {
    role: EUserRole;
    AuthRole: AuthenticationResult;
}

const AuthContext = createContext<{
    user: IUser | null,
    login: (() => void),
    logout: () => void
}>({
    user: null,
    login: () => { },
    logout: () => { }
});
export const AuthData = () => useContext(AuthContext);

const msalInstance = new PublicClientApplication(msalConfig);

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    console.log(user)
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
            } catch (error) {
                console.error('Błąd podczas inicjalizacji MSAL', error);
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
            })
            console.log(response.data);
            setUser((prevState) => {
                return {
                    ...prevState,
                    role: response.data.role as EUserRole,
                    AuthRole: prevState?.AuthRole ?? undefined,
                } as IUser;
            });

            sessionStorage.setItem("AuthData", JSON.stringify({
                AuthRole: loginResponse,
                role: response.data.role as EUserRole
            }));

            navigate(urls.client.reportProblem)


            // Pobranie listy zespołów po zalogowaniu
            //await fetchTeams(loginResponse.accessToken);
            //await testToken(loginResponse.accessToken)
        } catch (error) {
            console.error('Błąd podczas logowania', error);
        }
    };

    const logout = async () => {
        sessionStorage.removeItem("AuthData");
        setUser(null);
        console.log("log out")
        await msalInstance.logoutPopup();
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

