import { useQuery } from "react-query";
import { getSolvedProblems } from "../service/apiFetchFunctions";
import { AuthData } from "../auth/AuthWrapper";
import { useEffect, useState } from "react";
import SolvedProblem from "../components/problems/solved-problem/SolvedProblem";
import Pagination from "../components/Pagination";


const Archive = () => {

    const { user } = AuthData();

    const [problems, setProblems] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1);
    const solvedProblemQuery = useQuery(["solved-problems", page], () => getSolvedProblems(user?.accessToken as string, page));

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
        console.log(solvedProblemQuery.error)
        return <>Error</>
    }

    if (solvedProblemQuery.isLoading) {
        return <img src="src/assets/loading.gif" className="spinner"></img>
    }

    return (
        <div>
            <h2>Ukończone </h2>
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