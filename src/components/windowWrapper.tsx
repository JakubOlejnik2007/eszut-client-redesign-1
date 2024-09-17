const WindowWrapper = ({ title, element }: any) => {
    return (
        <div className='window'>
            <div className='titleBar'>{title}</div>
            <div className='windowContent'>
                {element}
            </div>
        </div>
    )
}

export default WindowWrapper;