import { UseQueryResult } from "react-query";

import { useState, useEffect } from "react";

interface IFilterProps {
    categoriesQuery: UseQueryResult<any, unknown>;
    placesQuery: UseQueryResult<any, unknown>;
    isVisible: boolean;
}

const Filter = ({ categoriesQuery, placesQuery, isVisible }: IFilterProps) => {

    const [shouldRender, setShouldRender] = useState(isVisible);

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
            <input className="filterInput" placeholder="wyszukaj po słowach..." />

            <select onChange={(e) => console.log(e.target.value)} className="filterSelect">
                {categoriesQuery.isSuccess &&
                    categoriesQuery.data.map((category: any) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
            </select>

            <select onChange={(e) => console.log(e.target.value)} className="filterSelect">
                {placesQuery.isSuccess &&
                    placesQuery.data.map((category: any) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
            </select>
        </div>
    ) : null;
};


export default Filter;