import TabElement from "../TabElement";

const ManageCategories = () => {
    
    
    
    return (
        <>
            <h3 style={{ textAlign: "center" }}>Zarządzaj kategoriami</h3>
            <div className="intTabContainer">
                <TabElement name={"problem z komputerem"} importance={2}></TabElement>
                <TabElement name={"brak hasła do dziennika"} importance={3}></TabElement>
                <TabElement name={"problem z internetem"} importance={1}></TabElement>

                {/* adding a new category */}
                <div className="intTabElement">
                    <input type="text" className="intLongInput" placeholder="dodaj nową kategorię..."></input>
                    <input type="text" className="intSmallInput small" placeholder="podaj priorytet kategorii 1-3"></input>
                    <button className="intTabButton intSuccess">Dodaj</button></div>
            </div>
        </>
    )
}

export default ManageCategories;