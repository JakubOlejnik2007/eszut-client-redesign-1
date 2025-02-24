import IComment from "../../types/comment.interface";

const CommentElement = ({ content, date, authorName }: IComment) => {
    const createDate = new Date(date);
    const timeDiff = Date.now() - date;
    const timeDiffInSeconds = Math.floor(timeDiff / 1000);


    const timeToDisplay = Math.abs(timeDiffInSeconds) < 60 ? `${Math.abs(timeDiffInSeconds)} sekund temu` :
        //TODO: actually make this not count from -1 seconds ig
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

export default CommentElement;