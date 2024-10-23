import ReactDOM from "react-dom";
import IUnsolvedProblemModal from "../types/unsolvedProblemModal.interface";
import DaysToDeadlineSpan from "./DaysToDeadlineSpan";
import WhoReportedLink from "./WhoReportedLink";

const ProblemModal = ({ handleClose, _id, whoName, whoEmail, what, when, priority }: IUnsolvedProblemModal) => {
    const reportDate = new Date(when);
    return ReactDOM.createPortal(
        <div className="modalContainer">

            <div className="modal">
                <div className="modalTitle">Zgłoszenie: {_id}</div>
                <div className="modalDescription">{what}</div>

                <div className="modalInfo">
                    <div className="progressBar">
                        <DaysToDeadlineSpan priority={priority} reportDate={reportDate} />
                    </div>

                    <WhoReportedLink whoEmail={whoEmail} whoName={whoName} reportDate={reportDate} />



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
