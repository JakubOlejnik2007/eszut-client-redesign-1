import ReactDOM from "react-dom";
import { AuthData } from "../../../auth/AuthWrapper";
import IUnsolvedProblemModal, { IEditableData } from "../../../types/unsolvedProblemModal.interface";
import getDeadlineDate from "../../../utils/getDeadlineDate";
import timeSpentPercentage from "../../../utils/timeSpentPercentage";
import WhoDealsLink from "../../mail/WhoDealsLink";
import WhoReportedLink from "../../mail/WhoReportedLink";
import DaysToDeadlineSpan from "../../partials/DaysToDeadlineSpan";
import MapPriorityToWords from "../../partials/MapPriorityToWords";
import TimeChart from "../../partials/TimeChart";
import { useState } from "react";
import { useQuery } from "react-query";
import { getCategories, getComments, getPlaces, insertComment, putUpdateUnsolvedProblem } from "../../../service/apiFetchFunctions";
import { ENotifType } from "../../../types/notification.interface";
import { Notif } from "../../notificationsWrapper";
import Loading from "../../../assets/loading.gif";
import ToggleEditableButton from "../../partials/ToggleEditableButton";
import CommentModal from "../../partials/CommentModal";


const ProblemModal = ({ handleClose, handleReject, handleMarkAsSolved, _id, whoName, whoEmail, what, when, priority, categoryName, placeName, whoDealsEmail, whoDealsName, isUnderRealization, placeId, categoryId }: IUnsolvedProblemModal) => {

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") handleClose();
    });

    const categoriesQuery = useQuery("categories", getCategories, { staleTime: 60000 });
    const placesQuery = useQuery("places", getPlaces, { staleTime: 60000 });

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IEditableData>({ categoryId: categoryId, placeId: placeId, priority: priority.toString(), wasChanged: false });
    const [showCommentsModal, setShowCommentsModal] = useState<boolean>(false);


    const { user, accessToken } = AuthData();
    const { displayNotif } = Notif();

    const USER_EMAIL = user?.email;

    const reportDate = new Date(when);


    const toggleEditable = () => {
        if (isEdit)
            try {
                putUpdateUnsolvedProblem(accessToken as string, editableData.priority, editableData.placeId, editableData.categoryId, _id);
                setIsEdit(!isEdit);
                if (editableData.wasChanged) displayNotif({ message: "Problem został zaktualizowany", type: ENotifType.SUCCESS });
            } catch (e) {
                displayNotif({ message: "Wystąpił błąd", type: ENotifType.ERROR });
            }
        else setIsEdit(!isEdit);
    }

    if (placesQuery.isLoading || categoriesQuery.isLoading) {
        return <img src={Loading} className="spinner"></img>
    }

    return ReactDOM.createPortal(<>
        <div className="modalContainer fade-in" onClick={handleClose}>

            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modalTitle">Zgłoszenie: {categoryName}</div>
                <div className="modalDescription">{what}</div>

                <div className="modalInfo">
                    <label className="infoLabel">ID:</label>{_id}
                    <div className="progressBar" >
                        <DaysToDeadlineSpan priority={priority} reportDate={reportDate} />
                        <TimeChart procent={timeSpentPercentage(reportDate, parseInt(editableData.priority))} />
                    </div>

                    <br></br>

                    <label className="infoLabel">Zgłaszający:</label> <WhoReportedLink whoEmail={whoEmail} whoName={whoName} reportDate={reportDate} categoryName={categoryName} placeName={placeName} whoDealsEmail={whoDealsEmail} whoDealsName={whoDealsName} isUnderRealization={isUnderRealization} priority={priority} what={what} />

                    {
                        isUnderRealization && <label className="infoLabel">Rozwiązywane przez: {whoDealsEmail === USER_EMAIL ? "Ciebie" : <WhoDealsLink whoEmail={whoEmail} whoName={whoName} reportDate={reportDate} categoryName={categoryName} placeName={placeName} whoDealsEmail={whoDealsEmail} whoDealsName={whoDealsName} isUnderRealization={isUnderRealization} priority={priority} what={what} />}</label>
                    }
                    <br /><br />
                    <br />
                    <label className="infoLabel">Zgłoszenie:</label> {reportDate.toLocaleString("pl")}<br />
                    <label className="infoLabel">Termin:</label> {(getDeadlineDate(reportDate, priority)).toLocaleString("pl")}<br />

                    <br /><br />
                    {
                        isEdit ?
                            <>
                                <label className="infoLabel">Kategoria:</label> <select value={editableData.categoryId} onChange={(e) => setEditableData({ ...editableData, categoryId: e.target.value, wasChanged: true })}>
                                    {categoriesQuery.data?.map((category: any) => <option key={category._id} value={category._id}>{category.name}</option>)}
                                </select>

                                <label className="infoLabel">Miejsce:</label> <select value={editableData.placeId} onChange={(e) => setEditableData({ ...editableData, placeId: e.target.value, wasChanged: true })}>
                                    {placesQuery.data?.map((place: any) => <option key={place._id} value={place._id}>{place.name}</option>)}
                                </select>

                                <label className="infoLabel">Priorytet:</label> <select value={editableData.priority} onChange={(e) => setEditableData({ ...editableData, priority: e.target.value, wasChanged: true })}>
                                    <option value="1">Wysoki</option>
                                    <option value="2">Średni</option>
                                    <option value="3">Niski</option>
                                </select>
                            </>
                            :
                            <>
                                <label className="infoLabel">Kategoria:</label> {categoriesQuery.data.find((item: any) => item._id == editableData.categoryId).name}<br />
                                <label className="infoLabel">Miejsce: </label>{placesQuery.data.find((item: any) => item._id == editableData.placeId).name}<br />
                                <label className="infoLabel">Priorytet:</label> <MapPriorityToWords priority={parseInt(editableData.priority)} /> <br />
                            </>
                    }


                </div>

                <div className="closeButton" onClick={handleClose}></div>

                <div className="bottomModalPart">
                    <button title="Otwórz komentarze" className={`mainButton message ${!isUnderRealization ? "singlebuttonoffset" : ""}`} onClick={() => setShowCommentsModal(!showCommentsModal)}>g</button>

                    {
                        USER_EMAIL === whoDealsEmail || !isUnderRealization ? <ToggleEditableButton isSingle={!isUnderRealization} toggle={toggleEditable} /> : null
                    }
                    {
                        USER_EMAIL === whoDealsEmail && isUnderRealization ? <><button className="mainButton marginLeft" onClick={handleReject}>Zrezygnuj</button>
                            <button className="mainButton successButton marginLeft" onClick={handleMarkAsSolved}>Ukończ</button></> : null
                    }
                </div>
            </div>

            {showCommentsModal && <CommentModal _id={_id} handleClose={() => setShowCommentsModal(false)} />}

        </div></>, document.body
    )
}


export default ProblemModal;