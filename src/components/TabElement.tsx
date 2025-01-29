import { ENotifType } from "../types/notification.interface";
import { Notif } from "./notificationsWrapper";
import { AuthData } from "../auth/AuthWrapper";
import { deleteCategory, deletePlace } from "../service/apiFetchFunctions";

interface TabElementProps {
    ObjectID: string;
    name: string;
    priority?: string;
    queryToRefetch: any;
}
const TabElement = ({ name, priority, ObjectID, queryToRefetch }: TabElementProps) => {
    const { displayNotif } = Notif();
    const { accessToken } = AuthData();


    const handleRemove = async (ObjectID: string, isPlace: boolean = true) => {
        try {

            console.log(ObjectID);

            await (isPlace ? deletePlace(accessToken as string, ObjectID) : deleteCategory(accessToken as string, ObjectID));
            displayNotif(
                {
                    type: ENotifType.SUCCESS,
                    message: `Usunięto ${isPlace ? "miejsce" : "kategorię"}.`
                }
            )
            queryToRefetch.refetch();
        } catch (e) {
            displayNotif(
                {
                    type: ENotifType.ERROR,
                    message: `Nie udało się usunąć ${isPlace ? "miejsca" : "kategorii"}.`
                }
            )
        }
    }


    if (priority != null) {
        return (
            <div className="intTabElement">
                {name}, priorytet {priority}<button className="intTabButton" onClick={() => handleRemove(ObjectID)}>usuń</button>
            </div>
        )
    } else {
        return (
            <div className="intTabElement">
                {name}<button className="intTabButton" onClick={() => handleRemove(ObjectID)}>usuń</button>
            </div>
        )
    }

}

export default TabElement;