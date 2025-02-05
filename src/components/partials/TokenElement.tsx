interface TokenElementProps {
    expiryDate: number;
    token: string;
    userEmail: string;
    handleDelete: () => void;
}

export const TokenElement = ({ expiryDate, token, userEmail, handleDelete }: TokenElementProps) => {

    const parsedDate = new Date(expiryDate);

    const dateTimeString = parsedDate.toLocaleString();
    const dateTimeStringToDisplay = dateTimeString.substring(0, dateTimeString.length - 3);


    return (

        <div className="intTabElement" style={{ fontFamily: "sfMono", fontSize: "0.9rem" }}>
            <div style={{ float: "left" }}>{token}</div>
            <button className="intTabButton dynamic" onClick={handleDelete}>usuń</button>
            <div style={{ float: "right", marginRight: "-32px" }}>{dateTimeStringToDisplay}</div>
        </div>
    )
}