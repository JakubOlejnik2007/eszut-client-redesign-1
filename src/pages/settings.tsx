import { useTheme } from "../components/theme/ThemeContext";
import TThemes from "../types/themes.type";
import ManagingTokens from "../components/partials/managingTokens";
import LightMode from "../assets/settings/light.png";
import DarkMode from "../assets/settings/dark.png";
import DesertMode from "../assets/settings/desert.png";
import AeroMode from "../assets/settings/aero.png";
import basicMode from "../assets/settings/basicDark.png";
import TokyoMode from "../assets/settings/tokyo.png";
import HighContrastMode from "../assets/settings/highContrast.png";
import { AuthData } from "../auth/AuthWrapper";
import EUserRole from "../types/userroles.enum";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUserMail, insertUserMail } from "../service/apiFetchFunctions";
import { Notif } from "../components/notificationsWrapper";
import { ENotifType } from "../types/notification.interface";

type TThemeRadio = {
    name: TThemes;
    img: string;
}

const ThemeRadio = ({ name, img }: TThemeRadio) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <label className="radiotheme">
            <input type="radio" name="test" value={name} defaultChecked={theme === name}
                onClick={() => toggleTheme(name)}
            />
            <img src={img} alt={`Obraz: motyw ${name}`}></img>
        </label>
    )
}



const SettingsScreen = () => {

    const { accessToken, user } = AuthData();
    const { displayNotif } = Notif();
    const mappedEmailQuery = useQuery("email", async () => await getUserMail(accessToken as string), {
        enabled: (!!accessToken && user && user.role === EUserRole.ADMIN) as boolean
    })

    useEffect(() => {
        if (mappedEmailQuery.isSuccess && mappedEmailQuery.data.length > 0) setNewEmail(mappedEmailQuery.data[0].mappedTo)
    }, [mappedEmailQuery.isSuccess, mappedEmailQuery.data])

    const validateEmail = (email: string) => {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleInsertEmail = async () => {
        try {
            if (!validateEmail(newEmail)) {
                displayNotif({
                    type: ENotifType.ERROR,
                    message: "Niepoprawny email"
                })
                return
            }
            await insertUserMail(accessToken as string, newEmail);
            displayNotif({
                type: ENotifType.SUCCESS,
                message: "Email został dodany pomyślnie."
            })
            mappedEmailQuery.refetch();
        } catch (e) {
            displayNotif({
                type: ENotifType.ERROR,
                message: "Email nie został dodany."
            })
        }
    }


    const [newEmail, setNewEmail] = useState("");

    const themes: TThemeRadio[] = [
        {
            name: "light",
            img: LightMode
        },
        {
            name: "dark",
            img: DarkMode
        },
        {
            name: "desert",
            img: DesertMode
        },
        {
            name: "tokyo",
            img: TokyoMode
        },
        {
            name: "highContrast",
            img: HighContrastMode
        },
        {
            name: "aero",
            img: AeroMode
        },        
        {
            name: "basic",
            img: basicMode
        },
        // {
        //     name: "retro",
        //     img: RetroMode
        // }
    ]

    return (
        <>

            <div style={{ backgroundColor: '', width: '100%' }} className="content-padding text-justify">
                <center>
                    <div style={{ textAlign: "center", width: '50%' }}>
                        <h3 style={{ textAlign: "left", marginBottom: '0px' }}>Styl aplikacji</h3>
                        <br></br>

                        {themes.map((theme) => <ThemeRadio key={theme.name} {...theme} />)}
                        <br />
                        {/* <h3 style={{ textAlign: "left", marginBottom: '12px' }}>zachowanie aplikacji:</h3>

                        wysyłaj powiadomienia<label className="switch"><input type="checkbox"></input><span className="slider"></span></label><br />
                        automatyczne wylogowanie<label className="switch"><input type="checkbox"></input><span className="slider"></span></label><br />
                       
                        <hr /> */}

                        {
                            user && user.role === EUserRole.ADMIN && <>
                                <hr />
                                <h3 style={{ textAlign: "left", marginBottom: '12px' }}>Dodatkowy adres email</h3>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}>
                                    <input type="email" name="email" className="settingsTextInput" placeholder="example@mail.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                                    <button className="mainButton sendButton" type="submit" style={{
                                        marginTop: "0px",
                                        width: "100px",
                                    }}
                                        onClick={handleInsertEmail}
                                    >Wyślij</button><br /></div>
                                <span className="secondary" style={{ fontSize: "15px" }}>
                                    Powiadomienia domyślnie i zawsze wysyłane pod adres mailowy w usłudzie Outlook. Dodanie innego adresu pozwala kierować wiadomości o zgłoszeniu także na prywatne adresy mailowe.
                                </span><br />
                                <br />
                            </>

                        }


                        {user && <>
                            <hr />
                            <h3 style={{ textAlign: "left", marginBottom: '12px' }}>Tokeny logowania</h3>
                            <ManagingTokens />
                        </>}
                    </div>
                </center>
            </div>
        </>
    )
}

export default SettingsScreen;

