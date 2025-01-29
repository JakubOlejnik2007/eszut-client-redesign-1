import TabElement from "../TabElement";

const ManagePlaces = () => {
    return (
        <>
            <h3 style={{ textAlign: "center" }}>Zarządzaj miejscami</h3>
            <div className="intTabContainer">
                <TabElement name={"sala 10"}></TabElement>
                <TabElement name={"sala 11"}></TabElement>
                <TabElement name={"sala 12"}></TabElement>
                <TabElement name={"sala 13"}></TabElement>
                <TabElement name={"sala 14"}></TabElement>
                <TabElement name={"sala 15"}></TabElement>
                <TabElement name={"sala 16"}></TabElement>
                <TabElement name={"sala 17"}></TabElement>
                <TabElement name={"sala 18"}></TabElement>
                {/* adding a new category */}
                <div className="intTabElement"><input type="text" className="intTabInput" placeholder="dodaj nowe miejsce..."></input>
                    <button className="intTabButton intSuccess">Dodaj</button></div>
            </div>
        </>
    )
}

export default ManagePlaces;