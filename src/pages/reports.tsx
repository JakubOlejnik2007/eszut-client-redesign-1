import { useQuery } from "react-query";
import { getCategories, getPlaces, getUnsolvedProblems } from "../service/apiFetchFunctions";
import { AuthData } from "../auth/AuthWrapper";
import { useEffect, useState } from "react";
import UnsolvedProblem from "../components/problems/unsolved-problem/UnsolvedProblem";
import Filter from "../components/Filter";


const ReportsScreen = () => {

    const categoriesQuery = useQuery("categories", getCategories, { staleTime: 60000 });
    const placesQuery = useQuery("places", getPlaces, { staleTime: 60000 });

    const { user, accessToken } = AuthData();


    const [showFilter, setShowFilter] = useState(false);

    const [underYou, setUnderYou] = useState<any[]>([]);
    const [underRealization, setUnderRealization] = useState<any[]>([]);
    const [other, setOther] = useState<any[]>([]);

    const handleChangeFilterSelects = (e: React.SyntheticEvent<HTMLSelectElement, Event>) => {
        console.log(Array.from((e.target as HTMLSelectElement).selectedOptions).map(option => option.value))
    }


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

    if (unsolvedProblemsQuery.isError || categoriesQuery.isError || placesQuery.isError) {
        console.log(unsolvedProblemsQuery.error)
        return <>Error</>
    }

    if (unsolvedProblemsQuery.isLoading || categoriesQuery.isLoading || placesQuery.isLoading) {
        return <img src="src/assets/loading.gif" className="spinner"></img>
    }





    return (
        <div style={{ width: "100%" }}>
            <button className="titleBarButton" onClick={() => setShowFilter(!showFilter)}>🔍</button>
            
            {
                showFilter && <Filter categoriesQuery={categoriesQuery} placesQuery={placesQuery} />
            }

            <h2>Realizowane przez ciebie</h2>
            <div style={{ display: "flex", maxWidth: "100%", width: "100%", flexWrap: "wrap", justifyContent: "center" }} className="reportContainer">
                {
                    underYou.map((problem: any) => <UnsolvedProblem key={problem._id} {...problem} refreshQuery={refreshQueries} />
                    )
                }
            </div>
            <hr></hr>
            <h2>Niepodjęte</h2>
            <div style={{ display: "flex", maxWidth: "100%", width: "100%", flexWrap: "wrap", justifyContent: "center" }} className="reportContainer">
                {
                    other.map((problem: any) => <UnsolvedProblem key={problem._id} {...problem} refreshQuery={refreshQueries} />
                    )
                }
            </div>
            <hr></hr>
            <h2>Realizowane przez innych administratorów</h2>
            <div style={{ display: "flex", maxWidth: "100%", width: "100%", flexWrap: "wrap", justifyContent: "center" }} className="reportContainer">
                {
                    underRealization.map((problem: any) => <UnsolvedProblem key={problem._id} {...problem} refreshQuery={refreshQueries} />)
                }
            </div>
        </div>
    )
}

export default ReportsScreen;