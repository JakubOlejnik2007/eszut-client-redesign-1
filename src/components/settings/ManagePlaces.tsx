import { useQuery } from "react-query";
import TabElement from "../TabElement";
import { getPlaces, insertNewPlace } from "../../service/apiFetchFunctions";
import { IPlace } from "../../types/formPartials.interface";
import { useState } from "react";
import { Notif } from "../notificationsWrapper";
import { ENotifType } from "../../types/notification.interface";
import { AuthData } from "../../auth/AuthWrapper";
import Loading from "../../assets/loading.gif";


const ManagePlaces = () => {
    const [placeToAdd, setPlaceToAdd] = useState<string>('');

    const { displayNotif } = Notif();
    const { accessToken } = AuthData();

    const placesQuery = useQuery("places", getPlaces, { staleTime: 60000 });

    const places = placesQuery.data as IPlace[];

    const handleAddPlace = async () => {
        if (!placeToAdd) {
            displayNotif({
                type: ENotifType.ERROR,
                message: "Nie wypełniono wszystkich wymaganych pól"
            })
            return;
        }
        try {
            await insertNewPlace(accessToken as string, placeToAdd);
            
            displayNotif({
                type: ENotifType.SUCCESS,
                message: "Dodano nowe miejsce"
            })

            setPlaceToAdd('');

            placesQuery.refetch();
        } catch (e) {
            displayNotif({
                type: ENotifType.ERROR,
                message: "Nie udało się dodać nowego miejsca"
            })

        }
    }


    if (placesQuery.isError) return (
        <div>Error</div>
    )
    if (placesQuery.isLoading) return (
        <img src={Loading} className="spinner"></img>

    );

    return (
        <>
            <h3 style={{ textAlign: "center" }}>Zarządzaj miejscami</h3>
            <div className="intTabContainer">
                {
                    places.map((place, index) => (
                        <TabElement key={index} name={place.name} ObjectID={place._id} queryToRefetch={placesQuery} />
                    ))
                }
                <div className="intTabElement"><input type="text" className="intTabInput" placeholder="dodaj nowe miejsce..." onChange={(e) => setPlaceToAdd(e.target.value)} value={placeToAdd} />
                    <button className="intTabButton intSuccess" onClick={handleAddPlace}>Dodaj</button></div>
            </div>
        </>
    )
}

export default ManagePlaces;