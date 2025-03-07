import { useQuery } from "react-query";
import { getSolvedProblems } from "../service/apiFetchFunctions";
import { AuthData } from "../auth/AuthWrapper";
import { useEffect, useState } from "react";
import SolvedProblem from "../components/problems/solved-problem/SolvedProblem";
import Pagination from "../components/Pagination";
import Loading from "../assets/loading.gif";

const Archive = () => {

    const { user, accessToken } = AuthData();

    const [problems, setProblems] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1);
    const solvedProblemQuery = useQuery(["solved-problems", page], () => getSolvedProblems(accessToken as string, page), {
        enabled: !!accessToken
    });

    const refreshQueries = () => {
        solvedProblemQuery.refetch();
    }

    useEffect(() => {
        if (solvedProblemQuery.isSuccess) {
            setProblems(solvedProblemQuery.data.items);
            const totalSolvedProblems = solvedProblemQuery.data.totalCount;
            const pageSize = 15;
            setMaxPage(Math.ceil(totalSolvedProblems / pageSize));
        }
    }, [solvedProblemQuery.isSuccess, solvedProblemQuery.data])

    if (solvedProblemQuery.isError) {
        return <>Error</>
    }

    if (solvedProblemQuery.isLoading) {
        return <img src={Loading} className="spinner"></img>
    }

    return (
        <div>
            {/* <h2>Ukończone </h2> */}
            <Pagination setPage={setPage} page={page} maxPage={maxPage} />
            <div style={{ display: "flex", justifyContent: "center", maxWidth: "100%", width: "100%", flexWrap: "wrap", }}>
                {
                    problems.map((problem: any) => <SolvedProblem key={problem._id} {...problem} refreshQuery={refreshQueries} />
                    )
                }
            </div>
        </div>
    )
}




export default Archive;