import { NavLink } from "react-router-dom";
import { useTheme } from "../components/theme/ThemeContext";
import TThemes from "../types/themes.type";

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
            img: "src/assets/settings/light.png"
        },
        {
            name: "dark",
            img: "src/assets/settings/dark.png"
        },
        {
            name: "desert",
            img: "src/assets/settings/desert.png"
        },
        {
            name: "tokyo",
            img: "src/assets/settings/tokyo.png"
        },
        {
            name: "highContrast",
            img: "src/assets/settings/highContrast.png"
        }
    ]

    return (
        <>

            <div style={{ backgroundColor: '', width: '100%' }} className="content-padding text-justify">
                <center>
                    <div style={{ textAlign: "center", width: '50%' }}>
                        <h3 style={{ textAlign: "left", marginBottom: '0px' }}>styl aplikacji:</h3>
                        <br></br>

                        {themes.map((theme) => <ThemeRadio key={theme.name} {...theme} />)}
                        <br/>
                        <hr/>
                        <h3 style={{ textAlign: "left", marginBottom: '12px' }}>zachowanie aplikacji:</h3>

                        wysyłaj powiadomienia<label className="switch"><input type="checkbox"></input><span className="slider"></span></label><br />
                        automatyczne wylogowanie<label className="switch"><input type="checkbox"></input><span className="slider"></span></label><br />
                        zły padding i marginesy<label className="switch"><input type="checkbox" checked></input><span className="slider"></span></label><br />

                        <br/>
                        <hr />
                        <h3 style={{ textAlign: "left", marginBottom: '12px' }}>tokeny:</h3>
                        

                        {/* table title */}
                        <div className="logElement tableTitle" style={{fontFamily: "sfMono", fontSize: "0.9rem"}}>
                            <div style={{ backgroundColor: '', width: '68%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'left', marginLeft: '2%' }}>nazwa tokenu</div>
                            <div style={{backgroundColor: '', width: '50%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'right', marginRight: '2%'}}>wygaśnięcie</div>

                        </div>

                        <TokenElement expiryDate={3} token="nazwa" userEmail="kliknij, by usunąć token" type={4} />  
                        <TokenElement expiryDate={3} token="nazwa" userEmail="kliknij, by usunąć token" type={4} />  
                        <TokenElement expiryDate={3} token="nazwa" userEmail="kliknij, by usunąć token" type={4} />  
                        <TokenElement expiryDate={3} token="nazwa" userEmail="kliknij, by usunąć token" type={4} />  
                        <TokenElement expiryDate={3} token="nazwa" userEmail="kliknij, by usunąć token" type={4} />  
                        <TokenElement expiryDate={3} token="nazwa" userEmail="kliknij, by usunąć token" type={4} />  
                        <TokenElement expiryDate={3} token="nazwa" userEmail="kliknij, by usunąć token" type={4} />  


                        <br/>
                        <button className="mainButton">utwórz token</button>
                    </div>
                </center>
            </div>
        </>
    )
}

export default SettingsScreen;

interface TokenElementProps {
    expiryDate: number;
    token: string;
    userEmail: string;
    type: number;
}

export const TokenElement = ({ expiryDate, token, userEmail, type }: TokenElementProps) => {

    const parsedDate = new Date(expiryDate);

    return (



        <div className="logElement" style={{fontFamily: "sfMono", fontSize: "0.9rem"}}>

            <div data-tooltip={userEmail} style={{ backgroundColor: '', width: '68%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'left', marginLeft: '2%', borderColor: '--var()' }}>{token}</div>

            <div style={{borderColor: 'var(--tableAccent)', width: '0.5%', height: '25px', borderRightWidth: '1px', borderRightStyle: 'solid' }}></div>
            <div style={{borderColor: '', width: '0.5%', height: '25px' }}></div>
            <div style={{backgroundColor: '', width: '50%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'right', marginRight: '2%'}} className="secondary">{parsedDate.toLocaleString()}</div>


        </div>
    )
}