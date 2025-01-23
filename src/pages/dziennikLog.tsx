import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AuthData } from "../auth/AuthWrapper";
import Pagination from "../components/Pagination";
import { getLogData } from "../service/apiFetchFunctions";

const DziennikLog = () => {


    const { user } = AuthData();

    const [entries, setEntries] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1);
    const logEntriesQuery = useQuery(["log-entries", page], () => getLogData(user?.accessToken as string, page));

    const refreshQueries = () => {
        logEntriesQuery.refetch();
    }

    useEffect(() => {
        if (logEntriesQuery.isSuccess) {
            setEntries(logEntriesQuery.data.items);
            const totalEntries = logEntriesQuery.data.totalCount;
            const pageSize = 50;
            setMaxPage(Math.ceil(totalEntries / pageSize));
        }
    }, [logEntriesQuery.isSuccess, logEntriesQuery.data])

    if (logEntriesQuery.isError) {
        console.log(logEntriesQuery.error)
        return <>Error</>
    }

    if (logEntriesQuery.isLoading) {
        return <img src="src/assets/loading.gif" className="spinner"></img>
    }
    return (
        <>
            <div style={{ backgroundColor: '', width: '100%', margin: '-15px' }} className="content-padding text-justify">

                <div style={{ textAlign: "center" }}>
                    <Pagination setPage={setPage} page={page} maxPage={maxPage} />
                </div>

                <h3 style={{ textAlign: "center" }}>Dzisiaj</h3>


                {
                    entries.map((entry: any) => <LogElement key={entry._id} {...entry} />
                    )
                }


                <br/>
                <br/>


            </div>
        </>
    )
}

export default DziennikLog

interface ILogElementProps {
    date: number;
    content: string;
    userEmail: string;
    type: number;
}
export const LogElement = ({ date, content, userEmail, type }: ILogElementProps) => {

    const parsedDate = new Date(date);

    return (



        <div className="logElement">

            <div className={`${["logInfo", "logWarning", "logError"][type]} log logIcon`}></div>
            <div data-tooltip={userEmail} style={{ backgroundColor: '', width: '72%', height: '25px', transform: 'translateY(2.5px)' }}>{content}</div>

            <div style={{ borderColor: 'var(--tableAccent)', width: '0.5%', height: '25px', borderRightWidth: '1px', borderRightStyle: 'solid' }}></div>
            <div style={{ borderColor: '', width: '0.5%', height: '25px' }}></div>

            <div style={{ backgroundColor: '', width: '19%', height: '25px', transform: 'translateY(2.5px)', textAlign: 'right', marginRight: '2%', fontFamily: "sfMono", fontSize: "0.9rem" }} className="secondary">{parsedDate.toLocaleString()}</div>


        </div>
    )
}
