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
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCategories, getComments, getPlaces, insertComment, putUpdateUnsolvedProblem } from "../../../service/apiFetchFunctions";
import { ENotifType } from "../../../types/notification.interface";
import NotificationsWrapper, { Notif } from "../../notificationsWrapper";
import Loading from "../../../assets/loading.gif";
interface IToggleEditableButtonProps {
    isSingle: boolean;
    toggle: () => void;
}

interface IEditableData {
    categoryId: string;
    placeId: string;
    priority: string;
    wasChanged: boolean;
}

const ToggleEditableButton = ({ isSingle, toggle }: IToggleEditableButtonProps) => {
    return (
        <button className={`mainButton edit ${isSingle ? "singlebuttonoffset" : ""}`} onClick={toggle}>g</button>
    )
}

const ProblemModal = ({ handleClose, handleReject, handleMarkAsSolved, _id, whoName, whoEmail, what, when, priority, categoryName, placeName, whoDealsEmail, whoDealsName, isUnderRealization, placeId, categoryId }: IUnsolvedProblemModal) => {


    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const [commentContent, setCommentContent] = useState("");

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };


    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);


    const handleInsertComment = async () => {
        try {
            const response = await insertComment(accessToken as string, _id, commentContent);
            if (response !== "Created") throw new Error();
            setCommentContent("");
            displayNotif({ message: "Komentarz dodany", type: ENotifType.SUCCESS })
        } catch {
        }

    }



    const categoriesQuery = useQuery("categories", getCategories, { staleTime: 60000 });
    const placesQuery = useQuery("places", getPlaces, { staleTime: 60000 });
    const commentsQuery = useQuery("comments", async () => await getComments(accessToken as string, _id));

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IEditableData>({ categoryId: categoryId, placeId: placeId, priority: priority.toString(), wasChanged: false });

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

    if (placesQuery.isLoading || categoriesQuery.isLoading || commentsQuery.isLoading) {
        return <img src={Loading} className="spinner"></img>
    }

    return ReactDOM.createPortal(
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
                    {
                        USER_EMAIL === whoDealsEmail || !isUnderRealization ? <ToggleEditableButton isSingle={!isUnderRealization} toggle={toggleEditable} /> : null
                    }
                    {
                        USER_EMAIL === whoDealsEmail ? <><button className="mainButton marginLeft" onClick={handleReject}>Zrezygnuj</button>
                            <button className="mainButton successButton marginLeft" onClick={handleMarkAsSolved}>Ukończ</button></> : null
                    }
                </div>
            </div>

            <div
                className="modal comments"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleMouseDown}
                style={{
                    position: "absolute",
                    left: `${position.x * 2}px`,
                    top: `${position.y}px`,
                    cursor: "grab",
                }}
            >
                <div className="modalTitle">Komentarze</div>
                <div className="newComment">
                    <input className="CommentInput" placeholder="co chcesz napisać?" onChange={e => setCommentContent(e.target.value)} />
                    <input className="CommentSend" type="submit" value="📨" onClick={handleInsertComment} />
                    <div className="commentContainer">
                        {
                            commentsQuery.isSuccess && commentsQuery.data.map((comment: IComment) => <CommentElement key={comment._id} {...comment} />)
                        }

                    </div>
                </div>
                <div className="closeButton" onClick={handleClose}></div>
            </div>

        </div>, document.body
    )
}


export default ProblemModal;


interface IComment {
    _id: string;
    content: string;
    date: number;
    authorEmail: string;
    authorName: string;
}

const CommentElement = ({ content, date, authorName }: IComment) => {
    const createDate = new Date(date);
    const timeDiff = Date.now() - date;
    const timeDiffInSeconds = Math.floor(timeDiff / 1000);


    const timeToDisplay = timeDiffInSeconds < 60 ? `${timeDiffInSeconds} sekund temu` :
        timeDiffInSeconds < 3600 ? `${Math.floor(timeDiffInSeconds / 60)} minut temu` :
            timeDiffInSeconds < 86400 ? `${Math.floor(timeDiffInSeconds / 3600)} godzin temu` :
                timeDiffInSeconds < 604800 ? `${Math.floor(timeDiffInSeconds / 86400)} dni temu` :
                    `${createDate.toLocaleDateString()}`;


    return (<>
        <div className="comment">
            <span className="commentName">{authorName}</span>
            <span className="commentTime">{timeToDisplay}</span>
            <span className="commentContent">{content}</span>
        </div>
    </>)
}