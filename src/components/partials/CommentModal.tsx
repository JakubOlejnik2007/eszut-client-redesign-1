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

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const [commentContent, setCommentContent] = useState("");

    const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        setIsDragging(true);
        setOffset({
            x: clientX - position.x,
            y: clientY - position.y
        });
    };

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;

        const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

        setPosition({
            x: clientX - offset.x,
            y: clientY - offset.y
        });
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        document.addEventListener("mousemove", handleDragMove);
        document.addEventListener("mouseup", handleDragEnd);
        document.addEventListener("touchmove", handleDragMove);
        document.addEventListener("touchend", handleDragEnd);

        return () => {
            document.removeEventListener("mousemove", handleDragMove);
            document.removeEventListener("mouseup", handleDragEnd);
            document.removeEventListener("touchmove", handleDragMove);
            document.removeEventListener("touchend", handleDragEnd);
        };
    }, [isDragging]);


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
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className="modalTitle">Komentarze</div>
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