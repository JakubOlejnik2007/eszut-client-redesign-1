import dayToDeadline from "../../utils/dayToDeadline"

interface IDaysToDeadlineSpan {
    reportDate: Date;
    priority: number;
}

const DaysToDeadlineSpan = ({ reportDate, priority }: IDaysToDeadlineSpan) => {

    const daysLeft = dayToDeadline(reportDate, priority)

    return (
        <span style={{ fontSize: "15px", color: "var(--secondaryText)" }}>
            {daysLeft > 0 ? `Czas na rozwiązanie: ${daysLeft} dni` : `Zaległe przez: ${-daysLeft} dni`}
        </span>
    )
}

export default DaysToDeadlineSpan;