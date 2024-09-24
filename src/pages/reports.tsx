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
        <div style={{ display: "flex", maxWidth: "365px" }}>
            {
                unsolvedProblemsQuery.data.map((problem: any) => UnsolvedProblem(problem))
            }


        </div>
    )
}

const UnsolvedProblem = ({ categoryName, placeName, whoName, whoEmail, what }: any) => {
    return (
        <div className="report">
            <h1 style={{ fontSize: "20px", textAlign: "left" }}>{categoryName}</h1>
            <div style={{ fontSize: "15px", color: "var(--secondaryText)", textAlign: "left" }}>{placeName} <br />
                <a href={`mailto:${whoEmail}?Subject=Wiadomość w sprawie twojego zgłoszenia&body=Wiadomość`}>{whoName} ({whoEmail})</a>
            </div>
            <hr />
            <div style={{ fontSize: "15px", color: "var(--secondaryText)", textAlign: "left" }}>
                {what}
            </div>
            <hr />

            <button className="mainButton trashButton" type="reset">Wyczyść</button>           <button className="mainButton" type="submit" >Wycieraczka</button>


        </div>)
}


