const SettingsScreen = () => {
    return (
        <>

                <div style={{ backgroundColor: '', width: '100%' }} className="content-padding text-justify">
                    <h3 style={{ textAlign: "center" }}>Ustawienia</h3>

                    <div style={{textAlign: "center"}}>
                    wysoki kontrast
                    <label className="switch"><input type="checkbox"></input><span className="slider"></span></label>
                    <br></br>
                    wysoki kontrast
                    <label className="switch"><input type="checkbox"></input><span className="slider"></span></label>
                    <br></br>
                    wysoki kontrast
                    <label className="switch"><input type="checkbox"></input><span className="slider"></span></label>
                    <br></br>
                    </div>
                </div>
        </>
    )
}

export default SettingsScreen;