import { useQuery } from "react-query";
import { getCategories, getPlaces, getUnsolvedProblems } from "../service/apiFetchFunctions";
import { AuthData } from "../auth/AuthWrapper";
import { useEffect, useState } from "react";
import UnsolvedProblem from "../components/problems/unsolved-problem/UnsolvedProblem";
import Filter from "../components/Filter";
import Fuse from "fuse.js";
import IFilterState from "../types/filterState.interface";
import Loading from "../assets/loading.gif";



const ReportsScreen = () => {

    const categoriesQuery = useQuery("categories", getCategories, { staleTime: 60000 });
    const placesQuery = useQuery("places", getPlaces, { staleTime: 60000 });

    const { user, accessToken } = AuthData();

    const [showFilter, setShowFilter] = useState(true);
    const [filterState, setFilterState] = useState<IFilterState>({ CategoryID: "", PlaceID: "", textToSearch: "" });

    const [underYou, setUnderYou] = useState<any[]>([]);
    const [underRealization, setUnderRealization] = useState<any[]>([]);
    const [other, setOther] = useState<any[]>([]);

    const unsolvedProblemsQuery = useQuery("unsolved-problems", () => getUnsolvedProblems(accessToken as string), {
        enabled: !!accessToken
    });

    const refreshQueries = () => {
        unsolvedProblemsQuery.refetch();
    }

    const splitProblems = () => {
        let problems = unsolvedProblemsQuery.data

        problems = problems.filter((problem: any) => filterState.CategoryID === "" || problem.categoryId === filterState.CategoryID);
        problems = problems.filter((problem: any) => filterState.PlaceID === "" || problem.placeId === filterState.PlaceID);
        const options = {
            keys: ["whoEmail", "whoName", "what"],
            threshold: 0.3,
        };

        const fuse = new Fuse(problems, options);
        problems = filterState.textToSearch
            ? fuse.search(filterState.textToSearch).map(result => result.item)
            : problems;


        const underYouProblems: any[] = [];
        const underRealizationProblems: any[] = [];
        const otherProblems: any[] = [];
        problems.forEach((element: any) => {
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

    useEffect(() => {
        if (unsolvedProblemsQuery.isSuccess) {
            splitProblems();
        }
    }, [unsolvedProblemsQuery.isSuccess, unsolvedProblemsQuery.data, filterState.CategoryID, filterState.PlaceID, filterState.textToSearch]);

    if (unsolvedProblemsQuery.isError || categoriesQuery.isError || placesQuery.isError) {
        return <>Error</>
    }

    if (unsolvedProblemsQuery.isLoading || categoriesQuery.isLoading || placesQuery.isLoading) {
        return <img src={Loading} className="spinner"></img>
    }





    return (
        <div style={{ width: "100%", position:"relative" }}>
        {/* <button className="titleBarButton search"></button> przydało by się to wyszukiwanie.. */}
        <button className="titleBarButton trash"></button>
        <button className="titleBarButton takeOn"></button>
        {/* JAK NIC NIE JEST ZAZNACZONE DAWAJ IM KLASĘ unavaible */}

            {
                <Filter categoriesQuery={categoriesQuery} placesQuery={placesQuery} isVisible={showFilter} setFilterState={setFilterState} filterState={filterState} />
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