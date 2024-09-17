import { AuthData } from "../auth/AuthWrapper"

export const LogInScreen = () => {

    const { login } = AuthData()

    return (
        <>

            <div style={{ backgroundColor: '', width: '100%' }} className="content-padding text-justify">
                <h3 style={{ textAlign: "center" }}>Zaloguj się z Microsoft</h3>
                <button className="microsoftLoginButton" onClick={login}>Sign in with microsoft</button>

            </div>

        </>
    )
}
