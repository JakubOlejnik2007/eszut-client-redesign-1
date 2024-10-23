export const DziennikLog = () => {
    return(
        <>
        <div style={{backgroundColor: '', width: '100%', margin: '-15px'}}className="content-padding text-justify">
            <h3 style={{textAlign: "center"}}>Dzisiaj</h3>



            <LogElement/>
            <LogElement/>
            <LogElement/>
            <LogElement/>


            <br/>
            <br/>


        </div>
        </>
    )
}


export const LogElement = () => {
    return(



            <div className="logElement"> 

            <div className="logError logIcon"></div>
            <div style={{backgroundColor: '', width: '72%', height: '25px', transform: 'translateY(2.5px)'}}>Aziur nie działa</div> 

            <div style={{borderColor: '#191919', width: '0.5%', height: '25px', borderRightWidth: '1px', borderRightStyle: 'solid'}}></div>
            <div style={{borderColor: '', width: '0.5%', height: '25px'}}></div>

            <div style={{backgroundColor: '', width: '25%', height: '25px', transform: 'translateY(2.5px)'}}>10:25 10.25.2025</div>


            </div>
        )
}


  // border-right-width: 1px;
  // border-right-style: solid;
  // border-color: var(--navBarColor);