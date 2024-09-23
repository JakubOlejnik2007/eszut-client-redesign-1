export const ReportsScreen = () => {
    return(
        <div style={{display: "flex", maxWidth: "365px"}}>

            <div className="report">
                <h1 style={{fontSize: "20px", textAlign: "left"}}>Problem psychiczny</h1>
                <div style={{fontSize: "15px", color: "var(--secondaryText)", textAlign:"left"}}>Sala: 10 <br/><a href="mailto:">Roberto (Robert.dutkiewicz@zstz-radzymin.pl)</a></div>

                <hr/>
                <div style={{fontSize: "15px", color: "var(--secondaryText)", textAlign:"left"}}>Lorem lorem ipsum ipsum dolor shit amet konsektektur coś tam coś tam</div>
                <hr/>

                <button className="mainButton trashButton" type="reset">Wyczyść</button>           <button className="mainButton" type="submit" >Wycieraczka</button>


            </div>

        </div>
    )
}


