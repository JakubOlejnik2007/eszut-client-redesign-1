const SystemSettings = () => {
    return (
        <>
                <div style={{ backgroundColor: '', width: '100%', margin: '-15px'  }} className="content-padding text-justify">
                    <h3 style={{ textAlign: "center" }}>Zarządzaj kategoriami</h3>

                        <TabElement expiryDate={2} token="t" userEmail="g" type={3}></TabElement>
                    

                </div>
        </>
    )
}

export default SystemSettings;


interface TabElementProps {
    expiryDate: number;
    token: string;
    userEmail: string;
    type: number;
}

export const TabElement = ({ expiryDate, token, userEmail, type }: TabElementProps) => {

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