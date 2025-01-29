interface TabElementProps {
    name: string;
    importance?: number;
}
const TabElement = ({ name, importance }: TabElementProps) => {

    if (importance != null) {
        return (
            <div className="intTabElement">
                {name}, priorytet {importance}<button className="intTabButton">usuń</button>
            </div>
        )
    } else {
        return (
            <div className="intTabElement">
                {name}<button className="intTabButton">usuń</button>
            </div>
        )
    }

}

export default TabElement;