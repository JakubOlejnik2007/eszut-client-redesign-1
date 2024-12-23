const SettingsScreen = () => {
    return (
        <>

                <div style={{ backgroundColor: '', width: '100%' }} className="content-padding text-justify">
                    <center>
                    <div style={{textAlign: "center", width: '50%'}}>
                    <h3 style={{ textAlign: "left", marginBottom:'0px' }}>styl aplikacji:</h3>
                    <br></br>

                        <label className="radiotheme">
                        <input type="radio" name="test" value="big"></input> 
                        <img src="src/assets/settings/light.png" alt="Option 2"></img>
                        </label>
                        <label className="radiotheme">
                        <input type="radio" name="test" value="big"></input> 
                        <img src="src/assets/settings/dark.png" alt="Option 2"></img>
                        </label>
                    <br></br>
                    <hr />

                    <h3 style={{ textAlign: "left", marginBottom:'12px' }}>zachowanie aplikacji:</h3>

                    wysyłaj powiadomienia<label className="switch"><input type="checkbox"></input><span className="slider"></span></label><br/>
                    automatyczne wylogowanie<label className="switch"><input type="checkbox"></input><span className="slider"></span></label><br/>
                    zły padding i marginesy<label className="switch"><input type="checkbox" checked></input><span className="slider"></span></label><br/>

                    <button className="mainButton">Zastosuj zmiany</button>
                    </div>
                    </center>
                </div>
        </>
    )
}

export default SettingsScreen;