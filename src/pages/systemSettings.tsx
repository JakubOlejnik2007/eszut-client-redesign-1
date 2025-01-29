const SystemSettings = () => {
    return (
        <>
                <div style={{ backgroundColor: '', width: '100%', margin: '-15px'  }} className="content-padding text-justify">
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

                </div>
        </>
    )
}

export default SystemSettings;


interface TabElementProps {
    name: string;
    importance?: number;
}

export const TabElement = ({ name, importance }: TabElementProps) => {

if (importance != null){
    return (
        <div className="intTabElement">
            {name}, waga {importance}<button className="intTabButton">usuń</button>
        </div>
    )
} else
{
    return (
        <div className="intTabElement">
            {name}<button className="intTabButton">usuń</button>
        </div>
    )
}

}
