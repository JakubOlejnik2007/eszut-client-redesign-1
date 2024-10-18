import ReactDOM from "react-dom";

const ProblemModal = () => {
    return ReactDOM.createPortal(
        <div className="modalContainer">
            <div className="modal">
            <h2>problem title</h2>
            time left: 69min<br/>
            sala: 10<br/>
            reporter<br/>
            </div>
        </div>, document.body
    )
}


export default ProblemModal
