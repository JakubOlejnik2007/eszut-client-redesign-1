const DziennikLog = () => {
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

export default DziennikLog

export const LogElement = () => {
    return(



            <div className="logElement"> 

            <div className="logError logIcon"></div>
            <div style={{backgroundColor: '', width: '72%', height: '25px', transform: 'translateY(2.5px)'}}> user token expired</div> 

            <div style={{borderColor: '#191919', width: '0.5%', height: '25px', borderRightWidth: '1px', borderRightStyle: 'solid'}}></div>
            <div style={{borderColor: '', width: '0.5%', height: '25px'}}></div>

            <div style={{backgroundColor: '', width: '19%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'right', marginRight: '2%'}} className="secondary">10:25, 10.25.2025</div>


            </div>
        )
}


  // border-right-width: 1px;
  // border-right-style: solid;
  // border-color: var(--navBarColor);