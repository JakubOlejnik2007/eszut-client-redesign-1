import IWhoReportedLink from "../types/whoReportedLink.interface";


const WhoReportedLink = ({ whoEmail, whoName, reportDate, priority, placeName, whoDealsEmail, whoDealsName, categoryName, what, isUnderRealization }: IWhoReportedLink) => {
    return (
        <a href={`mailto:${whoEmail}?Subject=Zgłoszenie z dnia: ${reportDate.toLocaleDateString("pl")}&body======={Dane zgłoszenia}======%0AZgłoszenie z dnia ${reportDate.toLocaleString("pl")}.%0AZgłaszający: ${whoName} (${whoEmail}).%0ADane zgłoszenia:%0A[${priority}] (${placeName}, ${categoryName})%0AOpis: "${what}"%0A${isUnderRealization ? `%0A%0AAdministrator odpowiedzialny: ${whoDealsName} (${whoDealsEmail})%0A` : ""}======{Dane zgłoszenia}======%0A%0A`} onClick={e => e.stopPropagation()}>{whoName} ✉</a>
    )
}

export default WhoReportedLink;