interface IWhoReportedLink {
    whoEmail: string;
    whoName: string;
    reportDate: Date;
}

const WhoReportedLink = ({ whoEmail, whoName, reportDate }: IWhoReportedLink) => {
    return (
        <a href={`mailto:${whoEmail}?Subject=Zgłoszenie z dnia: ${reportDate.toLocaleDateString("pl")}&body=Dane zgłoszenia`} onClick={(e) => e.stopPropagation()}>
            {whoName} ✉
        </a>
    )
}

export default WhoReportedLink;