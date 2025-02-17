import { useQuery } from "react-query";
import TabElement from "../TabElement";
import { getCategories, insertNewCategory, insertNewPlace } from "../../service/apiFetchFunctions";
import { ICategory } from "../../types/formPartials.interface";
import { useState } from "react";
import { AuthData } from "../../auth/AuthWrapper";
import { ENotifType } from "../../types/notification.interface";
import { Notif } from "../notificationsWrapper";
import Loading from "../../assets/loading.gif";

const ManageCategories = () => {
    const categoriesQuery = useQuery("categories", getCategories, { staleTime: 60000 });
    const [categoryToAdd, setCategoryToAdd] = useState<{
        name: string;
        priority: 1 | 2 | 3;
    }>({
        name: "",
        priority: 3
    });

    const { displayNotif } = Notif();
    const { accessToken } = AuthData();

    const categories = categoriesQuery.data as ICategory[];

    const handleAddCategory = async () => {
        if (!categoryToAdd.name || !categoryToAdd.priority) {
            displayNotif({
                type: ENotifType.ERROR,
                message: "Nie wypełniono wszystkich wymaganych pól"
            })
            return;
        }
        try {
            await insertNewCategory(accessToken as string, categoryToAdd.name, categoryToAdd.priority);
            displayNotif({
                type: ENotifType.SUCCESS,
                message: "Dodano nowe miejsce"
            })

            setCategoryToAdd({
                name: "",
                priority: 3
            });

            categoriesQuery.refetch();
        } catch (e) {
            displayNotif({
                type: ENotifType.ERROR,
                message: "Nie udało się dodać nowego miejsca"
            })
        }
    }

    if (categoriesQuery.isError) return (
        <div>Error</div>
    )
    if (categoriesQuery.isLoading) return (
        <img src={Loading} className="spinner"></img>
    );

    return (
        <>
            <h3 style={{ textAlign: "center" }}>Zarządzaj kategoriami</h3>
            <div className="intTabContainer">
            {/* inserting existing categories */}
            {
                categories.map((category, index) => <TabElement key={index} name={category.name} priority={category.priority} ObjectID={category._id} queryToRefetch={categoriesQuery} />)
            }
            {/* adding a new category */}
            <div className="intTabElement">
                    <input type="text" className="intLongInput" placeholder="Nazwa kategorii" onChange={(e) => setCategoryToAdd({ ...categoryToAdd, name: e.target.value })} value={categoryToAdd.name as string}></input>

                    <select className="intSmallInput small" value={categoryToAdd.priority as number} onChange={(e) => setCategoryToAdd({ ...categoryToAdd, priority: parseInt(e.target.value) as 1 | 2 | 3 })}>
                        <option value="1">Wysoki</option>
                        <option value="2">Średni</option>
                        <option value="3">Niski</option>
                    </select>
                    <button className="intTabButton intSuccess" onClick={handleAddCategory}>Dodaj</button></div>
            </div>
        </>
    )
}

export default ManageCategories;