import { QueryObserverIdleResult, QueryObserverSuccessResult } from "react-query";
import { ENotifType } from "../types/notification.interface";
import { Notif } from "./notificationsWrapper";
import { MouseEventHandler } from "react";

interface TabElementProps {
    ObjectID: string;
    name: string;
    importance?: number;
    queryToRefetch: any;
}
const TabElement = ({ name, importance, ObjectID, queryToRefetch }: TabElementProps) => {
    const { displayNotif } = Notif();


    const handleRemovePlace = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {



            displayNotif(
                {
                    type: ENotifType.ERROR,
                    message: "Usunięto miejsce"
                }
            )
            queryToRefetch.refetch();
        } catch (e) {
            displayNotif(
                {
                    type: ENotifType.ERROR,
                    message: "Nie udało się usunąć miejsca"
                }
            )
        }
    }


    if (importance != null) {
        return (
            <div className="intTabElement">
                {name}, priorytet {importance}<button className="intTabButton" value={ObjectID} onClick={(e) => handleRemovePlace(e)}>usuń</button>
            </div>
        )
    } else {
        return (
            <div className="intTabElement">
                {name}<button className="intTabButton">usuń</button>
            </div>
        )
    }

}

export default TabElement;