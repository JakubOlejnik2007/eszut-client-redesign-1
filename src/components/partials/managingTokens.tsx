import { useEffect, useState } from "react";
import { createLongPeriodToken, deleteToken, getActiveTokens } from "../../service/apiFetchFunctions";
import { AuthData } from "../../auth/AuthWrapper";
import { useQuery } from "react-query";
import { TokenElement } from "./TokenElement";
import { Notif } from "../notificationsWrapper";
import { ENotifType } from "../../types/notification.interface";
import TokenAlert from "../settings/TokenAlert";

const ManagingTokens = () => {

    const tokenDays = [30, 90, 120, 360, 720, 1440];
    const { user, accessToken } = AuthData();
    const [tokens, setTokens] = useState<any>([]);

    const [createdToken, setCreatedToken] = useState<string>("skibidi ohio w rizz gyatt");

    const [showTokenAlert, setShowTokenAlert] = useState(false);

    const { displayNotif } = Notif();

    const getActiveTokensQuery = useQuery("getActiveTokens", () => getActiveTokens(accessToken as string), {
        enabled: !!accessToken
    })

    const [tokenData, setTokenData] = useState<{
        name: string,
        daysToExpire: number
    }>({
        name: "",
        daysToExpire: 30
    })


    useEffect(() => {

        if (getActiveTokensQuery.isSuccess) {
            setTokens(getActiveTokensQuery.data);
        }
    }, [getActiveTokensQuery.isSuccess, getActiveTokensQuery.data])

    if (getActiveTokensQuery.isLoading) {
        return <img src="src/assets/loading.gif" className="spinner"></img>
    }
    
    const handleTokenCreate = async () => {
        try {

            const response = await createLongPeriodToken(accessToken as string, tokenData.daysToExpire as number, tokenData.name as string)

            setCreatedToken(response.longPeriodAccessToken);
            setShowTokenAlert(true);
            displayNotif({
                type: ENotifType.SUCCESS,
                message: "Token został utworzony pomyślnie."
            })
            getActiveTokensQuery.refetch();
        } catch (e) {
            displayNotif({
                type: ENotifType.ERROR,
                message: "Token nie został utworzony."
            })
        }

    }

    const handleDeleteToken = async (tokenId: string) => {
        try {
            const response = await deleteToken(accessToken as string, tokenId);

            setCreatedToken(response.longPeriodAccessToken);
            displayNotif({
                type: ENotifType.SUCCESS,
                message: "Token został usunięty pomyślnie."
            })
            getActiveTokensQuery.refetch();
        } catch (e) {
            displayNotif({
                type: ENotifType.ERROR,
                message: "Token nie został usunięty."
            })
        }

    }

    return (
        <>
            <div className="intTabContainer" style={{ width: "100%" }}>

                {showTokenAlert && <TokenAlert closeModal={() => { setShowTokenAlert(false) }} token={createdToken} />}

                {/* <div className="logElement tableTitle" style={{ fontFamily: "sfMono", fontSize: "0.9rem" }}>
                <div style={{ backgroundColor: '', width: '68%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'left', marginLeft: '2%' }}>nazwa tokenu</div>
                <div style={{ backgroundColor: '', width: '50%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'right', marginRight: '2%' }}>wygaśnięcie</div>
            </div> */}

                {
                    tokens && tokens.map((token: any) => <TokenElement key={token._id} {
                        ...{ token: token.tokenName, expiryDate: token.expiresAt, userEmail: token.userEmail, handleDelete: () => handleDeleteToken(token._id) }
                    } />)
                }

                <div className="intTabElement">
                    <input type="text" className="intLongInput" placeholder="nazwa tokenu..." onChange={(e) => setTokenData({ ...tokenData, name: e.target.value })} />
                    <select className="intSmallInput small" onChange={(e) => setTokenData({ ...tokenData, daysToExpire: parseInt(e.target.value) })}>
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