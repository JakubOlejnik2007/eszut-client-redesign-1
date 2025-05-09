import { useState } from "react";
import { AuthData } from "../../../auth/AuthWrapper";
import { putTakeOnProblem, putRejectProblem, putMarkAsSolved } from "../../../service/apiFetchFunctions";
import { ENotifType } from "../../../types/notification.interface";
import IUnsolvedProblem from "../../../types/unsolvedproblem.interface";
import dayToDeadline from "../../../utils/dayToDeadline";
import WhoReportedLink from "../../mail/WhoReportedLink";
import { Notif } from "../../notificationsWrapper";
import DaysToDeadlineSpan from "../../partials/DaysToDeadlineSpan";
import ProblemModal from "./UnsolvedProblemModal";

interface IUnsolvedProblemProps extends IUnsolvedProblem {
    refreshQuery: () => {},
    toggleItem: (item: string) => boolean,
    selected: boolean
}

const UnsolvedProblem = (props: IUnsolvedProblemProps) => {

    const { _id, categoryName, placeName, whoName, whoEmail, what, priority, when, whoDealsName, whoDealsEmail, isUnderRealization, refreshQuery, toggleItem, selected } = props;


    const { user, accessToken } = AuthData();
    const { displayNotif } = Notif();
    const reportDate = new Date(when);

    const [showModal, setShowModal] = useState(false);

    const daysLeft = dayToDeadline(reportDate, priority);

    const handleTakeOnProblem = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await putTakeOnProblem(accessToken as string, _id)
            if (response !== "OK") throw new Error();
            displayNotif({ message: "Przypisano problem", type: ENotifType.SUCCESS });
            refreshQuery();
        } catch (e) {
            displayNotif({ message: "Aktualizacja problemu nie powiodła się", type: ENotifType.ERROR });
        }
    }

    const handleRejectProblem = async (e: React.MouseEvent<HTMLElement>) => {
        setShowModal(false);
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await putRejectProblem(accessToken as string, _id)
            if (response !== "OK") throw new Error();
            displayNotif({ message: "Zrezygnowano z problemu", type: ENotifType.SUCCESS });
            refreshQuery();
        } catch (e) {
            displayNotif({ message: "Aktualizacja problemu nie powiodła się", type: ENotifType.ERROR });
        }
    }

    const handleMarkAsSolved = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setShowModal(false);

        try {
            const response = await putMarkAsSolved(accessToken as string, _id)
            if (response !== "OK") throw new Error();
            displayNotif({ message: "Zakończono rozwiązywanie problemu", type: ENotifType.SUCCESS });
            refreshQuery();
        } catch (e) {
            displayNotif({ message: "Aktualizacja problemu nie powiodła się", type: ENotifType.ERROR });
        }
    }

    return (
        <>
            <div className={`report ${daysLeft <= 0 ? "expired" : ""} ${selected ? "selected" : ""}`} onClick={(e) => {
                e.stopPropagation();
                e.shiftKey ? toggleItem(_id) :
                    setShowModal(true);
            }
            }
                style={{
                    userSelect: "none"
                }}
            >
                <div className={`waga${priority} reportTitle`}></div>
                {daysLeft <= 0 ? <div className="clockExpired">
                    {/* <img src={Alarm} height="18px" alt="Ostrzeżenie o nierozwiązanym problemie" /> */}
                </div> : ""}
                <h1 style={{ fontSize: "var(--20px)", textAlign: "left" }}>{categoryName}
                    <br />
                    <DaysToDeadlineSpan priority={priority} reportDate={reportDate} />
                </h1>
                <div style={{ fontSize: "var(--15px)", color: "var(--secondaryText)", textAlign: "left" }}>
                    ID: {_id} <br />
                    Sala: {placeName} <br />
                    <WhoReportedLink whoEmail={whoEmail} whoName={whoName} reportDate={reportDate} what={what} whoDealsEmail={whoDealsEmail} whoDealsName={whoDealsName} priority={priority} placeName={placeName} categoryName={categoryName} isUnderRealization={isUnderRealization} />
                </div>
                <hr className="problemHr"/>
                <div style={{ fontSize: "var(--15px)", color: "var(--secondaryText)", textAlign: "left", maxHeight: '128px' }} className="overflowfix problemDesc">{what}</div>
                <hr className="problemHr"/>
                {isUnderRealization && (
                    <>
                        <div>
                            <h2 style={{ fontSize: "var(--15px)", textAlign: "left" }}>Rozwiązywany</h2>
                            <div style={{ fontSize: "var(--15px)", color: "var(--secondaryText)", textAlign: "left" }}>
                                {whoDealsName} <br />({whoDealsEmail})
                            </div>
                        </div>
                        <hr className="hrBeforeButtons" />
                    </>
                )}
                <div className="bottomButtons">
                    {isUnderRealization ? (
                        whoDealsEmail === user?.email && (
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
            {showModal && <ProblemModal {...props} handleClose={() => { setShowModal(false); refreshQuery(); }} handleReject={handleRejectProblem} handleMarkAsSolved={handleMarkAsSolved} />}
        </>
    );
};

export default UnsolvedProblem;
