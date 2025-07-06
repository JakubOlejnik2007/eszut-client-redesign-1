interface dropdown {
    options: string[];
}



const Dropdown = ({options}: dropdown) => {

    return (
        <div className="intSelect container">
        <div className="intSelect field">
        <div className="arrow"></div>
            10
        </div>
        <div className="intSelect optionContainer active">
            {options.map(val=>{
                return (<div className="intSelect option">{val}</div>)
            })}            
        </div>
        </div>
    )
}

export default Dropdown;