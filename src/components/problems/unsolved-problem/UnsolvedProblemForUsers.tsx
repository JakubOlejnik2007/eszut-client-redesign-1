import { AuthData } from "../../../auth/AuthWrapper";
import IUnsolvedProblem from "../../../types/unsolvedproblem.interface";
import WhoDealsLink from "../../mail/WhoDealsLink";


interface IUnsolvedProblemProps extends IUnsolvedProblem {
    refreshQuery: () => {}
}

const UnsolvedProblemForUsers = (props: IUnsolvedProblemProps) => {

    const { _id, categoryName, placeName, what, when, isUnderRealization, } = props;


    AuthData();
    const reportDate = new Date(when);

    return (
        <>
            <div className={`report`}>
                <div className={`waga3 reportTitle`}></div>
                <h1 style={{ fontSize: "var(--20px)", textAlign: "left" }}>
                    {categoryName}
                    <br />

                </h1>
                <div style={{ fontSize: "var(--15px)", color: "var(--secondaryText)", textAlign: "left" }}>
                    ID: {_id} <br />
                    Sala: {placeName} <br />
                    Zgłoszono: {reportDate.toLocaleString()} <br />
                </div>
                <hr />
                <div style={{ fontSize: "var(--15px)", color: "var(--secondaryText)", textAlign: "left", maxHeight: '128px' }} className="overflowfix">{what}</div>

                {isUnderRealization && (
                    <>
                        <hr />
                        <div>
                            <h2 style={{ fontSize: "var(--15px)", textAlign: "left" }}>Rozwiązywany przez:</h2>
                            <div style={{ fontSize: "var(--15px)", color: "var(--secondaryText)", textAlign: "left" }}>
                                <WhoDealsLink {...props} reportDate={reportDate} />

                            </div>
                        </div>
                    </>
                )}
            </div >
        </>
    );
};

export default UnsolvedProblemForUsers;
