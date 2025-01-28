interface TokenElementProps {
    expiryDate: number;
    token: string;
    userEmail: string;
}

export const TokenElement = ({ expiryDate, token, userEmail }: TokenElementProps) => {

    const parsedDate = new Date(expiryDate);

    return (



        <div className="logElement" style={{ fontFamily: "sfMono", fontSize: "0.9rem" }}>

            <div data-tooltip={userEmail} style={{ backgroundColor: '', width: '68%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'left', marginLeft: '2%', borderColor: '--var()' }}>{token}</div>

            <div style={{ borderColor: 'var(--tableAccent)', width: '0.5%', height: '25px', borderRightWidth: '1px', borderRightStyle: 'solid' }}></div>
            <div style={{ borderColor: '', width: '0.5%', height: '25px' }}></div>
            <div style={{ backgroundColor: '', width: '50%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'right', marginRight: '2%' }} className="secondary">{parsedDate.toLocaleString()}</div>


        </div>
    )
}