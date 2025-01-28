const SystemSettings = () => {
    return (
        <>
                <div style={{ backgroundColor: '', width: '100%', margin: '-15px'  }} className="content-padding text-justify">
                    <h3 style={{ textAlign: "center" }}>Zarządzaj kategoriami</h3>
                    <div className="intTabContainer">
                        <TabElement name={"problem z komputerem"} importance={2}></TabElement>
                        <TabElement name={"problem z komputerem"} importance={2}></TabElement>
                        <TabElement name={"problem z komputerem"} importance={2}></TabElement>
                        <TabElement name={"problem z komputerem"} importance={2}></TabElement>
                        <TabElement name={"problem z komputerem"} importance={2}></TabElement>
                        <TabElement name={"problem z komputerem"} importance={2}></TabElement>
                        {/* adding a new category */}
                        <div className="intTabElement"><input type="text" className="intTabInput" placeholder="dodaj nową kategorię..."></input>
                        <button className="intTabButton intSuccess">Dodaj</button></div>
                    </div>


                </div>
        </>
    )
}

export default SystemSettings;


interface TabElementProps {
    name: string;
    importance: number;
}

export const TabElement = ({ name, importance }: TabElementProps) => {

    return (

        <div className="intTabElement">
            {name}<button className="intTabButton">usuń</button>
        </div>
    )
}