import { useQuery } from "react-query";
import { getUnsolvedProblems, putTakeOnProblem } from "../service/apiFetchFunctions";
import { AuthData } from "../auth/AuthWrapper";
import { ENotifType } from "../types/notification.interface";
import { Notif } from "../components/notificationsWrapper";

export const ReportsScreen = () => {

    const { user } = AuthData();

    const unsolvedProblemsQuery = useQuery("unsolved-problems", () => getUnsolvedProblems(user?.AuthRole.accessToken as string));

    if (unsolvedProblemsQuery.isError) {
        console.log(unsolvedProblemsQuery.error)
        return <>Error</>
    }

    if (unsolvedProblemsQuery.isLoading) {
        return <img src="src/assets/loading.gif" className="spinner"></img>
    }

    const refreshQueries = () => {
        unsolvedProblemsQuery.refetch();
    }

    return (
        <div style={{ display: "flex", maxWidth: "100%", width: "100%", flexWrap: "wrap", }}>
            {//<UnsolvedProblem categoryName="problem psychiczny" placeName="10" whoName="cameraman" whoEmail="cameraman@ep09.net" when={Date.now()} />
            }
            {
                unsolvedProblemsQuery.data.map((problem: any) => UnsolvedProblem({ ...problem }, refreshQueries))

            }


        </div>
    )
}

const UnsolvedProblem = ({ _id, categoryName, placeName, whoName, whoEmail, what, priority, when, whoDealsName, whoDealsEmail }: any, refreshQuery: () => void) => {

    console.log({ _id, categoryName, placeName, whoName, whoEmail, what, priority, when, whoDealsName, whoDealsEmail })

    const { user } = AuthData();
    const { displayNotif } = Notif();

    const reportDate = new Date(when);

    const dayToDeadline = (reportDate: Date, priority: number) => {
        return parseFloat((((reportDate.getTime() + 43200000 * 2 ** (priority - 1)) - (new Date(Date.now()).getTime())) / (1000 * 60 * 60 * 24)).toFixed(1));
    }

    const daysLeft = dayToDeadline(reportDate, priority);


    const handleTakeOnProblem = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        try {
            const response = await putTakeOnProblem(user?.AuthRole.accessToken as string, _id)
            console.log(response)
            if (response !== "OK") throw new Error();
            displayNotif({ message: "Przypisano problem", type: ENotifType.SUCCESS });
            refreshQuery();
        } catch (e) {
            console.log(e);
            displayNotif({ message: "Akutalizcja problemu nie powiodła się", type: ENotifType.ERROR });
        }

    }

    return (
        <div className={`report ${daysLeft <= 0 ? "expired" : ""}`}>
            {priority}
            {daysLeft <= 0 ? <div className="clockExpired"><img src="src/assets/alarm.png" height="18px"></img></div> : ""}
            <h1 style={{ fontSize: "20px", textAlign: "left" }}>{categoryName}
                <br /><text style={{ fontSize: "15px", color: "var(--secondaryText)" }}>
                    {
                        daysLeft > 0 ? <>Czas na rozwiązanie: {daysLeft}&nbsp;dni</> : <>Zaległe przez: {-daysLeft}&nbsp;dni</>
                    }




                </text>
            </h1>
            <div style={{ fontSize: "15px", color: "var(--secondaryText)", textAlign: "left" }}>Sala: {placeName} <br />
                {/* <a href={`mailto:${whoEmail}?Subject=Wiadomość w sprawie twojego zgłoszenia&body=Wiadomość`}>{whoName} ({whoEmail})</a> */}
                <a href={`mailto:${whoEmail}?Subject=Zgłoszenie z dnia: ${reportDate.toLocaleDateString("pl")}&body======={Dane zgłoszenia}======%0AZgłoszenie z dnia ${reportDate.toLocaleString("pl")}.%0AZgłaszający: ${whoName} (${whoEmail}).%0ADane zgłoszenia:%0A[${priority}] (${placeName}, ${categoryName})%0AOpis: "${what}"%0A${whoDealsName !== "" ? `%0A%0AAdministrator odpowiedzialny: ${whoDealsName} (${whoDealsEmail})%0A` : ""}======{Dane zgłoszenia}======%0A%0A`}>{whoName} ✉</a>



            </div>
            <hr />
            <div style={{ fontSize: "15px", color: "var(--secondaryText)", textAlign: "left" }}>
                {what}
            </div>
            <hr />
            {
                whoDealsName && <>
                    <div>
                        <h2 style={{ fontSize: "15px", textAlign: "left" }}>
                            Rozwiązywany
                        </h2>
                        <div style={{ fontSize: "15px", color: "var(--secondaryText)", textAlign: "left" }}>
                            {whoDealsName} <br />({whoDealsEmail})

                        </div>
                    </div>
                    <hr />
                </>
            }
            <div style={{ flexGrow: 1 }}></div>
            <div className="bottomButtons">
                <button className="mainButton secondaryButton" type="reset">Dodaj adnotację</button>
                <button className="mainButton" type="submit"
                    onClick={handleTakeOnProblem}>Podejmij problem</button>
            </div>

        </div>)
}


