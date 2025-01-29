import { useEffect, useState } from "react";
import { createLongPeriodToken, getActiveTokens } from "../../service/apiFetchFunctions";
import { AuthData } from "../../auth/AuthWrapper";
import { useQuery } from "react-query";
import { TokenElement } from "./TokenElement";

const ManagingTokens = () => {

    const tokenDays = [30, 90, 120, 360, 720, 1440];
    const { user, accessToken } = AuthData();
    const [tokens, setTokens] = useState<any>([]);

    const getActiveTokensQuery = useQuery("getActiveTokens", () => getActiveTokens(accessToken as string), {
        enabled: !!accessToken
    })

    const [tokenData, setTokenData] = useState<{
        name: string | null,
        daysToExpire: number | null
    }>({
        name: null,
        daysToExpire: null
    })


    useEffect(() => {
        console.log(getActiveTokensQuery.data)

        if (getActiveTokensQuery.isSuccess) {
            setTokens(getActiveTokensQuery.data);
        }
    }, [getActiveTokensQuery.isSuccess, getActiveTokensQuery.data])

    if (getActiveTokensQuery.isLoading) {
        return <img src="src/assets/loading.gif" className="spinner"></img>
    }

    console.log("Tokens", tokens)

    const handleTokenCreate = async () => {
        console.log(tokenData)

        await createLongPeriodToken(accessToken as string, tokenData.daysToExpire as number, tokenData.name as string)

    }

    return (
        <>
            <div className="intTabContainer" style={{width:"100%"}}>

            {/* <div className="logElement tableTitle" style={{ fontFamily: "sfMono", fontSize: "0.9rem" }}>
                <div style={{ backgroundColor: '', width: '68%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'left', marginLeft: '2%' }}>nazwa tokenu</div>
                <div style={{ backgroundColor: '', width: '50%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'right', marginRight: '2%' }}>wygaśnięcie</div>
            </div> */}

            {
                tokens && tokens.map((token: any) => <TokenElement key={token._id} {
                    ...{ token: token.tokenName, expiryDate: token.expiresAt, userEmail: token.userEmail }
                } />)
            }

            <div className="intTabElement">
                            <input type="text" className="intLongInput" placeholder="nazwa tokenu..." ></input>
                            <select className="intSmallInput small"onChange={(e) => setTokenData({ ...tokenData, daysToExpire: parseInt(e.target.value) })}>
                                {
                                    tokenDays.map(day => (
                                        <option key={day}>{day} dni</option>
                                    ))

                                }
                            </select>
                            <button className="intTabButton intSuccess dynamic" onClick={(e) => {
                                handleTokenCreate();
                                e.preventDefault();
                            }}>Dodaj</button></div>
                        </div>
        </>
    )
}

export default ManagingTokens;