import ReactDOM from "react-dom";
import IUnsolvedProblemModal from "../types/unsolvedProblemModal.interface";

const ProblemModal = ({ handleClose }: IUnsolvedProblemModal) => {
    return ReactDOM.createPortal(
        <div className="modalContainer">

            <div className="modal">
                <div className="modalTitle">Zgłoszenie: title</div>
                <div className="modalDescription">
                    if only google implemented the Masonry layout and stop arguing like a little baby i wouldn't have to spend so much time writing this css. Even then older browsers wouldn't support it and a system like this requires backwards compatibility.
                </div>
                <div className="modalInfo">
                    <div className="progressBar">
                    5 godzin pozostało
                    </div>

                    Zgłaszający: Agata 123


                    
                    </div>
                <div className="closeButton" onClick={handleClose}></div>
                <div className="bottomModalPart">
                    <button className="mainButton marginLeft">Zrezygnuj</button>
                    <button className="mainButton successButton marginLeft">Ukończ</button>
                </div>
            </div>
        </div>, document.body
    )
}


export default ProblemModal
