import { UseQueryResult } from "react-query";

interface IFilterProps {
    categoriesQuery: UseQueryResult<any, unknown>;
    placesQuery: UseQueryResult<any, unknown>;

}

const Filter = ({categoriesQuery, placesQuery}: IFilterProps) => {

    const handleChangeFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
    }

    return (<>
        <div className="filterContainer">
            <h3 className="filterTitle">Opcje filtrowania</h3>
            <input className="filterInput" placeholder="wyszukaj po słowach..." />

            <select onChange={(e) => handleChangeFilterSelect(e)} className="filterSelect">
                {
                    categoriesQuery.isSuccess && categoriesQuery.data.map((category: any) => <option key={category._id} value={category._id}>{category.name}</option>)
                }

            </select>
            <select onChange={(e) => handleChangeFilterSelect(e)} className="filterSelect">
                {
                    placesQuery.isSuccess && placesQuery.data.map((category: any) => <option key={category._id} value={category._id}>{category.name}</option>)
                }
            </select>
        </div>
    </>)
}

export default Filter;