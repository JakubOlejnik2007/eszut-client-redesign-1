interface ISolvedProblem {
    _id: string;
    categoryName: string;
    placeName: string;
    whoName: string;
    whoEmail: string;
    what: string;
    priority: number;
    when: string;
    isSolved: boolean;
    whoSolvedName: string;
    whoSolvedEmail: string;
    dateOfSolved: number;
}

export default ISolvedProblem;