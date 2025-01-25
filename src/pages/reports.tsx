import { useQuery } from "react-query";
import { getUnsolvedProblems } from "../service/apiFetchFunctions";
import { AuthData } from "../auth/AuthWrapper";
import { useEffect, useState } from "react";
import UnsolvedProblem from "../components/problems/unsolved-problem/UnsolvedProblem";


const ReportsScreen = () => {

    const { user, accessToken } = AuthData();

    const [underYou, setUnderYou] = useState<any[]>([]);
    const [underRealization, setUnderRealization] = useState<any[]>([]);
    const [other, setOther] = useState<any[]>([]);

    console.log(user)

    const unsolvedProblemsQuery = useQuery("unsolved-problems", () => getUnsolvedProblems(accessToken as string), {
        enabled: !!accessToken
    });

    const refreshQueries = () => {
        unsolvedProblemsQuery.refetch();
    }

    useEffect(() => {
        if (unsolvedProblemsQuery.isSuccess) {
            const underYouProblems: any[] = [];
            const underRealizationProblems: any[] = [];
            const otherProblems: any[] = [];
            unsolvedProblemsQuery.data.forEach((element: any) => {
                if (element.isUnderRealization && element.whoDealsEmail && user?.email === element.whoDealsEmail) {
                    underYouProblems.push(element);
                } else if (element.isUnderRealization) {
                    underRealizationProblems.push(element);
                } else {
                    otherProblems.push(element);
                }
            });

            setUnderYou(underYouProblems);
            setUnderRealization(underRealizationProblems);
            setOther(otherProblems);
        }
    }, [unsolvedProblemsQuery.isSuccess, unsolvedProblemsQuery.data])

    if (unsolvedProblemsQuery.isError) {
        console.log(unsolvedProblemsQuery.error)
        return <>Error</>
    }

    if (unsolvedProblemsQuery.isLoading) {
        return <img src="src/assets/loading.gif" className="spinner"></img>
    }





    return (
        <div style={{ width: "100%" }}>
            <h2>Realizowane przez ciebie</h2>
            <div style={{ display: "flex", maxWidth: "100%", width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
                {
                    underYou.map((problem: any) => <UnsolvedProblem key={problem._id} {...problem} refreshQuery={refreshQueries} />
                    )
                }
            </div>
            <hr></hr>
            <h2>Niepodjęte</h2>
            <div style={{ display: "flex", maxWidth: "100%", width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
                {
                    other.map((problem: any) => <UnsolvedProblem key={problem._id} {...problem} refreshQuery={refreshQueries} />
                    )
                }
            </div>
            <hr></hr>
            <h2>Realizowane przez innych administratorów</h2>
            <div style={{ display: "flex", maxWidth: "100%", width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
                {
                    underRealization.map((problem: any) => <UnsolvedProblem key={problem._id} {...problem} refreshQuery={refreshQueries} />
                    )
                }
            </div>
        </div>
    )
}

export default ReportsScreen;