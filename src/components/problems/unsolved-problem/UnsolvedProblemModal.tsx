import ReactDOM from "react-dom";
import { AuthData } from "../../../auth/AuthWrapper";
import IUnsolvedProblemModal from "../../../types/unsolvedProblemModal.interface";
import getDeadlineDate from "../../../utils/getDeadlineDate";
import timeSpentPercentage from "../../../utils/timeSpentPercentage";
import WhoDealsLink from "../../mail/WhoDealsLink";
import WhoReportedLink from "../../mail/WhoReportedLink";
import DaysToDeadlineSpan from "../../partials/DaysToDeadlineSpan";
import MapPriorityToWords from "../../partials/MapPriorityToWords";
import TimeChart from "../../partials/TimeChart";
import { useState } from "react";
import { useQuery } from "react-query";
import { getCategories, getPlaces } from "../../../service/apiFetchFunctions";

interface IToggleEditableButtonProps {
    isSingle: boolean;
    toggle: () => void;
}

const ToggleEditableButton = ({ isSingle, toggle }: IToggleEditableButtonProps) => {
    return (
        <button className={`mainButton edit ${isSingle ? "singlebuttonoffset" : ""}`} onClick={toggle}>g</button>
    )
}

const ProblemModal = ({ handleClose, handleReject, handleMarkAsSolved, _id, whoName, whoEmail, what, when, priority, categoryName, placeName, whoDealsEmail, whoDealsName, isUnderRealization, placeId, categoryId }: IUnsolvedProblemModal) => {

    const categoriesQuery = useQuery("categories", getCategories, { staleTime: 60000 });
    const placesQuery = useQuery("places", getPlaces, { staleTime: 60000 });

    const [isEdit, setIsEdit] = useState<boolean>(false);
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
                    <br />
                    Zgłoszenie: {reportDate.toLocaleString("pl")}<br />
                    Termin: {(getDeadlineDate(reportDate, priority)).toLocaleString("pl")}<br />

                    <br /><br />
                    {
                        isEdit ?
                            <>
                                Kategoria: <select value={categoryId}>
                                    {categoriesQuery.data?.map((category: any) => <option key={category._id} value={category._id}>{category.name}</option>)}
                                </select>

                                Miejsce: <select value={placeId}>
                                    {placesQuery.data?.map((place: any) => <option key={place._id} value={place._id}>{place.name}</option>)}
                                </select>

                                Priorytet: <select value={priority}>
                                    <option value="1">Wysoki</option>
                                    <option value="2">Średni</option>
                                    <option value="3">Niski</option>
                                </select>
                            </>
                            :
                            <>
                                Kategoria: {categoryName}<br />
                                Miejsce: {placeName}<br />
                                Priorytet: <MapPriorityToWords priority={priority} /> <br />
                            </>
                    }


                </div>

                <div className="closeButton" onClick={handleClose}></div>
                <div className="bottomModalPart">
                    {
                        USER_EMAIL === whoDealsEmail || !isUnderRealization ? <ToggleEditableButton isSingle={!isUnderRealization} toggle={() => setIsEdit(!isEdit)} /> : null
                    }
                    {
                        USER_EMAIL === whoDealsEmail ? <><button className="mainButton marginLeft" onClick={handleReject}>Zrezygnuj</button>
                            <button className="mainButton successButton marginLeft" onClick={handleMarkAsSolved}>Ukończ</button></> : null
                    }
                </div>
            </div>
        </div>, document.body
    )
}


export default ProblemModal
