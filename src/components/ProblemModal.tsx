import ReactDOM from "react-dom";

const ProblemModal = () => {
    return ReactDOM.createPortal(
        <div className="modalContainer">
            <div className="modal">
                this is a full size modal
            </div>
        </div>, document.body
    )
}


export default ProblemModal