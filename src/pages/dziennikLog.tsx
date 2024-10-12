export const DziennikLog = () => {
    return(
        <>
        <div style={{backgroundColor: '', width: '100%', margin: '-15px'}}className="content-padding text-justify">
            <h3 style={{textAlign: "center"}}>Dzisiaj</h3>




            <LogElement type="error" logValue="Skill issue" timeStamp="04:40 20.13.2014"/>
            <LogElement type="error" logValue="Skill issue" timeStamp="04:40 20.13.2014"/>
            <LogElement type="warning" logValue="Możesz mieć skill issue" timeStamp="04:40 20.13.2014"/>
            <LogElement type="info" logValue="skibi" timeStamp="04:40 20.13.2014"/>
            <LogElement type="info" logValue="do toilet lorem ipsum bryk bryknie do bryki" timeStamp="04:40 20.13.2014"/>
            <LogElement type="warning" logValue="Skill issue" timeStamp="04:40 20.13.2014"/>


            <br/>
            <br/>


        </div>
        </>
    )
}


export const LogElement = (type, logValue, timeStamp) => {
    return(



            <div className="logElement"> 

            <div className="logError logIcon" style={{marginLeft:'15px', marginRight:'15px'}}></div>

            <div style={{borderColor: '#191919', width: '0%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'solid'}}></div>

            <div style={{backgroundColor: '', width: '80%', height: '100%', paddingLeft: '15px'}}>Aziur nie działa</div> 

            <div style={{borderColor: '#191919', width: '0%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'solid'}}></div>

            <div style={{backgroundColor: '', width: '20%', height: '100%', textAlign: 'right', paddingRight: '15px'}}>10:25 10.25.2025</div>

            </div>
        )
}


  // border-right-width: 1px;
  // border-right-style: solid;
  // border-color: var(--navBarColor);