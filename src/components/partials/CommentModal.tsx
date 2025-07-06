import { useEffect, useState } from "react";
import { getComments, insertComment } from "../../service/apiFetchFunctions";
import IComment from "../../types/comment.interface";
import { ENotifType } from "../../types/notification.interface";
import CommentElement from "./Comment";
import { AuthData } from "../../auth/AuthWrapper";
import { Notif } from "../notificationsWrapper";
import { useQuery } from "react-query";
import Loading from "../../assets/loading.gif";

interface ICommentModal {
    _id: string;
    handleClose: () => void;
}

const CommentModal = ({ _id, handleClose }: ICommentModal) => {

    const { accessToken } = AuthData();
    const { displayNotif } = Notif();


    const commentsQuery = useQuery("comments", async () => await getComments(accessToken as string, _id));

    const [position, setPosition] = useState({ x: (window.innerWidth/2)-300, y: 775 });

    const [commentContent, setCommentContent] = useState("");

    let dragTarget: HTMLElement | null = null;
    let offsetX = 0;
    let offsetY = 0;
    
    document.addEventListener('mousedown', function (e: MouseEvent) {
        const target = e.target as HTMLElement;
        if (target.classList.contains('movable')) {
            const parent = target.parentElement as HTMLElement | null;
            if (!parent) return;
    
            dragTarget = parent;
            offsetX = e.clientX - dragTarget.offsetLeft;
            offsetY = e.clientY - dragTarget.offsetTop;
            document.body.style.userSelect = 'none';
        }
    });
    
    document.addEventListener('mousemove', function (e: MouseEvent) {
        if (!dragTarget) return;
        dragTarget.style.left = `${e.clientX - offsetX}px`;
        dragTarget.style.top = `${e.clientY - offsetY}px`;
    });
    
    document.addEventListener('mouseup', function () {
        dragTarget = null;
        document.body.style.userSelect = '';
    });
    

    const handleInsertComment = async () => {
        try {
            const response = await insertComment(accessToken as string, _id, commentContent);
            if (response !== "Created") throw new Error();
            setCommentContent("");
            (document.getElementById("commentInput") as HTMLInputElement).value = ""
            displayNotif({ message: "Komentarz dodany", type: ENotifType.SUCCESS })
            commentsQuery.refetch();

        } catch {
        }

    }

    if (commentsQuery.isLoading) {
        return <img src={Loading} className="spinner"></img>
    }

    return (
        <div
            className="modal comments"
            onClick={(e) => e.stopPropagation()}
            style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className="modalTitle movable">Komentarze</div>
            <div className="newComment">
                <input className="CommentInput" placeholder="co chcesz napisać?" id="commentInput" onChange={e => setCommentContent(e.target.value)} />
                <input className="CommentSend" type="submit" value="📨" onClick={handleInsertComment} />
                <div className="commentContainer">
                    {
                        commentsQuery.isSuccess && commentsQuery.data.map((comment: IComment) => <CommentElement key={comment._id} {...comment} />)
                    }

                </div>
            </div>
            <div className="closeButton" onClick={handleClose}></div>
        </div>
    )
}

export default CommentModal;