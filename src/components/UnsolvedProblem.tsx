import { useState } from "react";
import { AuthData } from "../auth/AuthWrapper";
import { putTakeOnProblem, putRejectProblem } from "../service/apiFetchFunctions";
import { ENotifType } from "../types/notification.interface";
import { Notif } from "./notificationsWrapper";
import ProblemModal from "./ProblemModal";
import IUnsolvedProblem from "../types/unsolvedproblem.interface";

const UnsolvedProblem = (props: IUnsolvedProblem, refreshQuery: () => {}) => {

    const { _id, categoryName, placeName, whoName, whoEmail, what, priority, when, whoDealsName, whoDealsEmail, isUnderRealization } = props;


    const { user } = AuthData();
    const { displayNotif } = Notif();
    const reportDate = new Date(when);

    const [showModal, setShowModal] = useState(false);

    const dayToDeadline = (reportDate: Date, priority: number) => {
        return parseFloat((((reportDate.getTime() + 43200000 * 2 ** (priority - 1)) - (new Date(Date.now()).getTime())) / (1000 * 60 * 60 * 24)).toFixed(1));
    }

    const daysLeft = dayToDeadline(reportDate, priority);

    const handleTakeOnProblem = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await putTakeOnProblem(user?.AuthRole.accessToken as string, _id)
            console.log(response)
            if (response !== "OK") throw new Error();
            displayNotif({ message: "Przypisano problem", type: ENotifType.SUCCESS });
            refreshQuery();
        } catch (e) {
            console.log(e);
            displayNotif({ message: "Aktualizacja problemu nie powiodła się", type: ENotifType.ERROR });
        }
    }

    const handleRejectProblem = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await putRejectProblem(user?.AuthRole.accessToken as string, _id)
            console.log(response)
            if (response !== "OK") throw new Error();
            displayNotif({ message: "Zrezygnowano z problemu", type: ENotifType.SUCCESS });
            refreshQuery();
        } catch (e) {
            console.log(e);
            displayNotif({ message: "Aktualizacja problemu nie powiodła się", type: ENotifType.ERROR });
        }
    }

    return (
        <>
            <div className={`report ${daysLeft <= 0 ? "expired" : ""}`} onClick={() => setShowModal(true)}>
                <div className={`waga${priority} reportTitle`}></div>
                {daysLeft <= 0 ? <div className="clockExpired"><img src="src/assets/alarm.png" height="18px" /></div> : ""}
                <h1 style={{ fontSize: "20px", textAlign: "left" }}>{categoryName}
                    <br />
                    <span style={{ fontSize: "15px", color: "var(--secondaryText)" }}>
                        {daysLeft > 0 ? `Czas na rozwiązanie: ${daysLeft} dni` : `Zaległe przez: ${-daysLeft} dni`}
                    </span>
                </h1>
                <div style={{ fontSize: "15px", color: "var(--secondaryText)", textAlign: "left" }}>
                    Sala: {placeName} <br />
                    <a href={`mailto:${whoEmail}?Subject=Zgłoszenie z dnia: ${reportDate.toLocaleDateString("pl")}&body=Dane zgłoszenia`}>
                        {whoName} ✉
                    </a>
                </div>
                <hr />
                <div style={{ fontSize: "15px", color: "var(--secondaryText)", textAlign: "left" }}>{what}</div>
                <hr />
                {isUnderRealization && (
                    <>
                        <div>
                            <h2 style={{ fontSize: "15px", textAlign: "left" }}>Rozwiązywany</h2>
                            <div style={{ fontSize: "15px", color: "var(--secondaryText)", textAlign: "left" }}>
                                {whoDealsName} <br />({whoDealsEmail})
                            </div>
                        </div>
                        <hr />
                    </>
                )}
                <div className="bottomButtons">
                    <button className="mainButton secondaryButton" type="reset">Dodaj adnotację</button>
                    {isUnderRealization ? (
                        whoDealsEmail === user?.AuthRole.account.username && (
                            <button className="mainButton" type="submit" onClick={handleRejectProblem}>
                                Zrezygnuj
                            </button>
                        )
                    ) : (
                        <button className="mainButton" type="submit" onClick={handleTakeOnProblem}>
                            Podejmij problem
                        </button>
                    )}
                </div>
            </div>
            {showModal && <ProblemModal {...props} handleClose={() => setShowModal(false)} />}
        </>
    );
};

export default UnsolvedProblem;
