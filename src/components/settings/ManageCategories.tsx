import { useQuery } from "react-query";
import TabElement from "../TabElement";
import { getCategories } from "../../service/apiFetchFunctions";

const ManageCategories = () => {

    const categoriesQuery = useQuery("categories", getCategories, { staleTime: 60000 });


    return (
        <>
            <h3 style={{ textAlign: "center" }}>Zarządzaj kategoriami</h3>
            <div className="intTabContainer">

                {/* adding a new category */}
                <div className="intTabElement">
                    <input type="text" className="intLongInput" placeholder="dodaj nową kategorię..."></input>
                    <select className="intSmallInput small">
                        <option value="1">Wysoki</option>
                        <option value="2">Średni</option>
                        <option value="3">Niski</option>
                    </select>
                    <button className="intTabButton intSuccess">Dodaj</button></div>
            </div>
        </>
    )
}

export default ManageCategories;