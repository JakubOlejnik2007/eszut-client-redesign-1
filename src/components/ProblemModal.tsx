import ReactDOM from "react-dom";
import IUnsolvedProblemModal from "../types/unsolvedProblemModal.interface";
import DaysToDeadlineSpan from "./partials/DaysToDeadlineSpan";
import WhoReportedLink from "./WhoReportedLink";
import TimeChart from "./partials/TimeChart";
import timeSpentPercentage from "../utils/timeSpentPercentage";
import MapPriorityToWords from "./partials/MapPriorityToWords";
import getDeadlineDate from "../utils/getDeadlineDate";
import { AuthData } from "../auth/AuthWrapper";
import WhoDealsLink from "./WhoDealsLink";

const ProblemModal = ({ handleClose, handleReject, handleMarkAsSolved, _id, whoName, whoEmail, what, when, priority, categoryName, placeName, whoDealsEmail, whoDealsName, isUnderRealization }: IUnsolvedProblemModal) => {

    const { user } = AuthData();
    const USER_EMAIL = user?.AuthRole.account.username;

    const reportDate = new Date(when);

    console.log(timeSpentPercentage(reportDate, priority), _id)

    return ReactDOM.createPortal(
        <div className="modalContainer fade-in" onClick={handleClose}>

            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modalTitle">Zgłoszenie: {categoryName}</div>
                <div className="modalDescription">{what}</div>

                <div className="modalInfo">
                    <div className="progressBar" >
                        <DaysToDeadlineSpan priority={priority} reportDate={reportDate} />
                        <TimeChart procent={timeSpentPercentage(reportDate, priority)} />
                    </div>

                    <br></br>
                    Zgłaszający: <WhoReportedLink whoEmail={whoEmail} whoName={whoName} reportDate={reportDate} categoryName={categoryName} placeName={placeName} whoDealsEmail={whoDealsEmail} whoDealsName={whoDealsName} isUnderRealization={isUnderRealization} priority={priority} what={what} />
                    Rozwiązywane przez: {whoDealsEmail === USER_EMAIL ? "Ciebie" : <WhoDealsLink whoEmail={whoEmail} whoName={whoName} reportDate={reportDate} categoryName={categoryName} placeName={placeName} whoDealsEmail={whoDealsEmail} whoDealsName={whoDealsName} isUnderRealization={isUnderRealization} priority={priority} what={what} />}<br /><br />
                    Zgłoszenie: {reportDate.toLocaleString("pl")}<br />
                    Termin: {(getDeadlineDate(reportDate, priority)).toLocaleString("pl")}<br />
                    Rozwiązanie: nie rozwiązane
                    <br /><br />Priorytet: <MapPriorityToWords priority={priority} />

                </div>

                <div className="closeButton" onClick={handleClose}></div>
                <div className="bottomModalPart">
                    <button className="mainButton edit">g</button>
                    {
                        USER_EMAIL === whoDealsEmail ? <><button className="mainButton marginLeft" onClick={handleReject}>Zrezygnuj</button><button className="mainButton successButton marginLeft" onClick={handleMarkAsSolved}>Ukończ</button></> : null
                    }
                </div>
            </div>
        </div>, document.body
    )
}


export default ProblemModal
