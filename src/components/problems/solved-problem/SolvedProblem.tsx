import { useState } from "react";
import { AuthData } from "../../../auth/AuthWrapper";
import { putMarkProblemAsUnsolved, putTakeOnProblem } from "../../../service/apiFetchFunctions";
import { ENotifType } from "../../../types/notification.interface";
import dayToDeadline from "../../../utils/dayToDeadline";
import WhoReportedLink from "../../mail/WhoReportedLink";
import { Notif } from "../../notificationsWrapper";
import ISolvedProblem from "../../../types/solvedProblem.interface";
import WhenSolved from "../../partials/WhenSolved";


interface ISolvedProblemProps extends ISolvedProblem {
    refreshQuery: () => {}
}

const SolvedProblem = (props: ISolvedProblemProps) => {

    const { _id, categoryName, placeName, whoName, whoEmail, what, priority, when, whoSolvedName, whoSolvedEmail, dateOfSolved, refreshQuery } = props;


    const { user, accessToken } = AuthData();
    const { displayNotif } = Notif();
    const reportDate = new Date(when);

    const [showModal, setShowModal] = useState(false);

    const daysLeft = dayToDeadline(reportDate, priority);

    const handleRetakeProblem = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await putMarkProblemAsUnsolved(accessToken as string, _id)
            if (response !== "OK") throw new Error();
            displayNotif({ message: "Przypisano problem", type: ENotifType.SUCCESS });
            refreshQuery();
        } catch (e) {
            displayNotif({ message: "Aktualizacja problemu nie powiodła się", type: ENotifType.ERROR });
        }
    }

    return (
        <>
            <div className={`report`} onClick={() => setShowModal(true)}>
                <div className={`waga${priority} reportTitle`}></div>
                <h1 style={{ fontSize: "var(--20px)", textAlign: "left" }}>{categoryName}
                    <br />
                    <WhenSolved dateOfSolved={dateOfSolved} />
                </h1>
                <div style={{ fontSize: "var(--15px)", color: "var(--secondaryText)", textAlign: "left" }}>
                    Sala: {placeName} <br />
                    <WhoReportedLink whoEmail={whoEmail} whoName={whoName} reportDate={reportDate} what={what} whoDealsEmail={whoSolvedEmail} whoDealsName={whoSolvedName} priority={priority} placeName={placeName} categoryName={categoryName} isUnderRealization={false} />
                </div>
                <hr />
                <div style={{ fontSize: "var(--15px)", color: "var(--secondaryText)", textAlign: "left", maxHeight: '128px' }} className="overflowfix">{what}</div>
                <hr />
                <div>
                    <h2 style={{ fontSize: "var(--15px)", textAlign: "left" }}>Rozwiązany:</h2>
                    <div style={{ fontSize: "var(--15px)", color: "var(--secondaryText)", textAlign: "left" }}>
                        {whoSolvedName} <br />({whoSolvedEmail})
                    </div>
                </div>
                <hr />
                <div className="bottomButtons">
                    <button className="mainButton secondaryButton" type="reset">Dodaj adnotację</button>
                    <button className="mainButton" type="submit" onClick={handleRetakeProblem}>
                        Przywróć problem
                    </button>
                </div>
            </div>
            {/*showModal && <ProblemModal {...props} handleClose={() => setShowModal(false)} handleReject={handleRejectProblem} handleMarkAsSolved={handleMarkAsSolved} />*/}
        </>
    );
};

export default SolvedProblem;
