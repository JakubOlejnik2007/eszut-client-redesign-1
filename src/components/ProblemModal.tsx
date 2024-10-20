import ReactDOM from "react-dom";

const ProblemModal = () => {
    return ReactDOM.createPortal(
        <div className="modalContainer">
            
            <div className="modal">
            <div className="modalTitle">Zgłoszenie: title</div>
            <div className="modalInfo">
            time left: 69min<br/>
            sala: 10<br/>
            reporter<br/>
            </div>
            <div className="closeButton"></div>
            </div>
        </div>, document.body
    )
}


export default ProblemModal
