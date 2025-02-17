import { useTheme } from "../components/theme/ThemeContext";
import TThemes from "../types/themes.type";
import ManagingTokens from "../components/partials/managingTokens";
import LightMode from "../assets/settings/light.png";
import DarkMode from "../assets/settings/dark.png";
import DesertMode from "../assets/settings/desert.png";
import TokyoMode from "../assets/settings/tokyo.png";
import HighContrastMode from "../assets/settings/highContrast.png";
import RetroMode from "../assets/settings/retro.png";

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
                        <h3 style={{ textAlign: "left", marginBottom: '0px' }}>styl aplikacji:</h3>
                        <br></br>

                        {themes.map((theme) => <ThemeRadio key={theme.name} {...theme} />)}
                        <br />
                        <hr />
                        {/* <h3 style={{ textAlign: "left", marginBottom: '12px' }}>zachowanie aplikacji:</h3>

                        wysyłaj powiadomienia<label className="switch"><input type="checkbox"></input><span className="slider"></span></label><br />
                        automatyczne wylogowanie<label className="switch"><input type="checkbox"></input><span className="slider"></span></label><br />
                       
                        <hr /> */}
                        <h3 style={{ textAlign: "left", marginBottom: '12px' }}>mail:</h3>

                        <input type="text" className="settingsTextInput"></input>
                        <span className="secondary" style={{fontSize: "15px"}}>powiadomienia będą wysyłane na twoją pocztę outlook. jeżeli chcesz, możesz podać tutaj drugi adres email, na który powiadomienia będą wysyłane.</span><br/>
                        <br />
                        <hr />
                        <h3 style={{ textAlign: "left", marginBottom: '12px' }}>tokeny:</h3>
                        <ManagingTokens />
                    </div>
                </center>
            </div>
        </>
    )
}

export default SettingsScreen;

