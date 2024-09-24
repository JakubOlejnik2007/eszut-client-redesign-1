import { useQuery } from "react-query";
import { getUnsolvedProblems } from "../service/apiFetchFunctions";
import { AuthData } from "../auth/AuthWrapper";

export const ReportsScreen = () => {

    const { user } = AuthData();

    const unsolvedProblemsQuery = useQuery("unsolved-problems", () => getUnsolvedProblems(user?.AuthRole.accessToken as string));


    if (unsolvedProblemsQuery.isError) {
        return <>{unsolvedProblemsQuery.error}</>
    }

    if (unsolvedProblemsQuery.isLoading) {
        return <>You spin me</>
    }

    return (
        <div style={{ display: "flex", maxWidth: "100%", width:"100%", flexWrap: "wrap",}}>
            <UnsolvedProblem categoryName="problem psychiczny" placeName="10" whoName="cameraman" whoEmail="cameraman@ep09.net"/>
            {
                unsolvedProblemsQuery.data.map((problem: any) => UnsolvedProblem(problem))
            }


        </div>
    )
}

const UnsolvedProblem = ({ categoryName, placeName, whoName, whoEmail, what }: any) => {
    return (
        <div className="report">
            <h1 style={{ fontSize: "20px", textAlign: "left" }}>{categoryName} <text style={{fontSize: "15px", color: "var(--secondaryText)"}}>5 dni</text></h1>
            <div style={{ fontSize: "15px", color: "var(--secondaryText)", textAlign: "left" }}>Sala: {placeName} <br />
                {/* <a href={`mailto:${whoEmail}?Subject=Wiadomość w sprawie twojego zgłoszenia&body=Wiadomość`}>{whoName} ({whoEmail})</a> */}
                <a href={`mailto:${whoEmail}?Subject=Wiadomość w sprawie twojego zgłoszenia&body=Wiadomość`}>{whoName} ✉</a>

            </div>
            <hr />
            <div style={{ fontSize: "15px", color: "var(--secondaryText)", textAlign: "left" }}>
                {what}
            </div>
            <hr />
            <div style={{flexGrow: 1}}></div>
            <div className="bottomButtons">
            <button className="mainButton warningButton" type="reset">Dodaj adnotację</button>           <button className="mainButton" type="submit" >Podejmij problem</button>
            </div>

        </div>)
}


