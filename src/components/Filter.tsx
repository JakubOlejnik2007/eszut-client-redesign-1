import { UseQueryResult } from "react-query";

import { useState, useEffect } from "react";
import IFilterState from "../types/filterState.interface";

interface IFilterProps {
    categoriesQuery: UseQueryResult<any, unknown>;
    placesQuery: UseQueryResult<any, unknown>;
    isVisible: boolean;
    filterState: IFilterState;
    setFilterState: React.Dispatch<React.SetStateAction<IFilterState>>;
}

const Filter = ({ categoriesQuery, placesQuery, isVisible, filterState, setFilterState }: IFilterProps) => {

    const [shouldRender, setShouldRender] = useState(isVisible);


    const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, what: "CategoryID" | "PlaceID" | "textToSearch") => {
        setFilterState({ ...filterState, [what]: e.target.value });
    }


    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
        } else {
            setTimeout(() => setShouldRender(false), 300);
        }
    }, [isVisible]);
    return shouldRender ? (
        <div className={`filterContainer ${isVisible ? "showFilterContainer" : "hideFilterContainer"}`}>
            <h3 className="filterTitle">Opcje filtrowania</h3>
            <input className="filterInput" placeholder="wyszukaj po słowach..." onChange={(e) => handleChangeFilter(e, "textToSearch")} />

            <select onChange={(e) => handleChangeFilter(e, "CategoryID")} className="filterSelect">
                <option value={""}>
                    Dowolna kategoria
                </option>
                {categoriesQuery.isSuccess &&
                    categoriesQuery.data.map((category: any) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
            </select>

            <select onChange={(e) => handleChangeFilter(e, "PlaceID")} className="filterSelect">
                <option value={""}>
                    Dowolne miejsce
                </option>
                {placesQuery.isSuccess &&
                    placesQuery.data.map((place: any) => (
                        <option key={place._id} value={place._id}>
                            {place.name}
                        </option>
                    ))}
            </select>
        </div>
    ) : null;
};


export default Filter;