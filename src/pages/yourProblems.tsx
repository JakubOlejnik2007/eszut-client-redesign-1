import { useQuery } from "react-query";
import { AuthData } from "../auth/AuthWrapper";
import { getUnsolvedProblemsFromEmail } from "../service/apiFetchFunctions";
import UnsolvedProblem from "../components/problems/unsolved-problem/UnsolvedProblem";
import UnsolvedProblemForUsers from "../components/problems/unsolved-problem/UnsolvedProblemForUsers";

const YourProblems = () => {
    const { accessToken } = AuthData();

    const unsolvedProblemsQuery = useQuery("unsolved-problems-email", () => getUnsolvedProblemsFromEmail(accessToken as string), {
        enabled: !!accessToken
    });

    if (unsolvedProblemsQuery.isError) {
        console.log(unsolvedProblemsQuery.error)
        return <>Error</>
    }

    if (unsolvedProblemsQuery.isLoading) {
        return <img src="src/assets/loading.gif" className="spinner"></img>
    }

    return (
        <div style={{ width: "100%" }}>
            <h2>Twoje zgłoszenia (nierozwiązane)</h2>
            <div style={{ display: "flex", maxWidth: "100%", width: "100%", flexWrap: "wrap", justifyContent: "center" }} className="reportContainer">
                {
                    unsolvedProblemsQuery.isSuccess && unsolvedProblemsQuery.data.map((problem: any) => <UnsolvedProblemForUsers key={problem._id} {...problem} />
                    )
                }
            </div>
        </div>
    )
}

export default YourProblems;