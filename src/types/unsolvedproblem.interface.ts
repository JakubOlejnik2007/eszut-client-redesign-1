interface IUnsolvedProblem {
    _id: string;
    categoryName: string;
    placeName: string;
    whoName: string;
    whoEmail: string;
    what: string;
    priority: number;
    when: string;
    whoDealsName: string;
    whoDealsEmail: string;
    isUnderRealization: boolean;
}

export default IUnsolvedProblem;