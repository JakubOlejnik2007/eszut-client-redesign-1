import { useNavigate } from "react-router-dom";
import { AuthData } from "../auth/AuthWrapper"
import urls from "../utils/urls";
import { useEffect } from "react";

const LogInScreen = () => {

    const { login, user } = AuthData()

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {

            navigate(urls.client.reportProblem);
        }
    }, [user])



    return (
        <>

            <div style={{ backgroundColor: '', width: '100%' }} className="content-padding text-justify">
                <h3 style={{ textAlign: "center" }}>Zaloguj się z Microsoft</h3>
                <center>
                    <button className="microsoftLoginButton" onClick={login}><span className="micLogo" />Sign in with microsoft</button>
                </center>
            </div>

        </>
    )
}

export default LogInScreen;