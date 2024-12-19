import ReactDOM from "react-dom";
import IUnsolvedProblemModal from "../types/unsolvedProblemModal.interface";
import DaysToDeadlineSpan from "./DaysToDeadlineSpan";
import WhoReportedLink from "./WhoReportedLink";
import TimeChart from "./TimeChart";
import timeSpentPercentage from "../utils/timeSpentPercentage";

const ProblemModal = ({ handleClose, handleReject, handleMarkAsSolved, _id, whoName, whoEmail, what, when, priority, categoryName, placeName, whoDealsEmail, whoDealsName, isUnderRealization }: IUnsolvedProblemModal) => {
    const reportDate = new Date(when);

    console.log(timeSpentPercentage(reportDate, priority), _id)

    return ReactDOM.createPortal(
        <div className="modalContainer fade-in" onClick={handleClose}>

            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modalTitle">Zgłoszenie: {categoryName}</div>
                <div className="modalDescription">{what}</div>

                <div className="modalInfo">
                    <div className="progressBar" >
                        <DaysToDeadlineSpan priority={priority} reportDate={reportDate}/>
                        <TimeChart procent={timeSpentPercentage(reportDate, priority)}/>
                    </div>

                    <br></br>
                    Zgłaszający: <WhoReportedLink whoEmail={whoEmail} whoName={whoName} reportDate={reportDate} categoryName={categoryName} placeName={placeName} whoDealsEmail={whoDealsEmail} whoDealsName={whoDealsName} isUnderRealization={isUnderRealization} priority={priority} what={what} />
                    Rozwiązywane przez: Ciebie<br/><br/>
                    Data zgłoszenia: {reportDate.toLocaleDateString("pl")}<br/>
                    Data rozwiązania: nie rozwiązane
                    <br /><br />waga: {priority}

                </div>

                <div className="closeButton" onClick={handleClose}></div>
                <div className="bottomModalPart">
                    <button className="mainButton edit">g</button>
                    <button className="mainButton marginLeft" onClick={handleReject}>Zrezygnuj</button>
                    <button className="mainButton successButton marginLeft" onClick={handleMarkAsSolved}>Ukończ</button>
                </div>
            </div>
        </div>, document.body
    )
}


export default ProblemModal
