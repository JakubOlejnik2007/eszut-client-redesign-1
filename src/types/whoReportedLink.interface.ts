interface IWhoReportedLink {
    whoEmail: string;
    whoName: string;
    reportDate: Date;
    priority: number;
    placeName: string;
    whoDealsEmail: string;
    whoDealsName: string;
    categoryName: string;
    what: string;
    isUnderRealization: boolean;
}

export default IWhoReportedLink;