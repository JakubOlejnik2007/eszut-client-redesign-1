import { useQuery } from "react-query";
import { getUnsolvedProblems } from "../service/apiFetchFunctions";
import { AuthData } from "../auth/AuthWrapper";

export const ReportsScreen = () => {

    const { user } = AuthData();

    const unsolvedProblemsQuery = useQuery("unsolved-problems", () => getUnsolvedProblems(user?.AuthRole.accessToken as string));

    if (unsolvedProblemsQuery.isError) {
        console.log(unsolvedProblemsQuery.error)
        return <>Error</>
    }

    if (unsolvedProblemsQuery.isLoading) {
        return <>You spin me</>
    }

    return (
        <div style={{ display: "flex", maxWidth: "100%", width: "100%", flexWrap: "wrap", }}>
            <UnsolvedProblem categoryName="problem psychiczny" placeName="10" whoName="cameraman" whoEmail="cameraman@ep09.net" when={Date.now()} />
            {
                unsolvedProblemsQuery.data.map((problem: any) => UnsolvedProblem(problem))
            }


        </div>
    )
}

const UnsolvedProblem = ({ categoryName, placeName, whoName, whoEmail, what, priority, when, whoDealsName, whoDealsEmail }: any) => {
    const reportDate = new Date(when);
    const currDate = new Date(Date.now());
    const daysDiff = Math.floor((currDate.getTime() - reportDate.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className="report">
            <h1 style={{ fontSize: "20px", textAlign: "left" }}>{categoryName}
                <text style={{ fontSize: "15px", color: "var(--secondaryText)" }}>
                    {daysDiff > 0 ? <> {daysDiff} {daysDiff === 1 ? "dzień" : "dni"}</> : <> Dziś:&nbsp;{reportDate.toTimeString().split(" ")[0]}</>}


                </text>
            </h1>
            <div style={{ fontSize: "15px", color: "var(--secondaryText)", textAlign: "left" }}>Sala: {placeName} <br />
                {/* <a href={`mailto:${whoEmail}?Subject=Wiadomość w sprawie twojego zgłoszenia&body=Wiadomość`}>{whoName} ({whoEmail})</a> */}
                <a href={`mailto:${whoEmail}?Subject=Zgłoszenie z dnia: ${reportDate.toLocaleDateString("pl")}&body======={Dane zgłoszenia}======%0AZgłoszenie z dnia ${reportDate.toLocaleString("pl")}.%0AZgłaszajcy: ${whoName} (${whoEmail}).%0ADane zgłoszenia:%0A[${priority}] (${placeName}, ${categoryName})%0AOpis: "${what}"%0A${whoDealsName !== "" ? `%0A%0AAdministrator odpowiedzialny: ${whoDealsName} (${whoDealsEmail})%0A` : ""}======{Dane zgłoszenia}======%0A%0A`}>{whoName} ✉</a>

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
                <button className="mainButton warningButton" type="reset">Dodaj adnotację</button>           <button className="mainButton" type="submit" >Podejmij problem</button>
            </div>

        </div>)
}


