import dayToDeadline from "../../utils/dayToDeadline"

interface IDaysToDeadlineSpan {
    reportDate: Date;
    priority: number;
}

const DaysToDeadlineSpan = ({ reportDate, priority }: IDaysToDeadlineSpan) => {

    const daysLeft = dayToDeadline(reportDate, priority)

    return (
        <span style={{ fontSize: "var(--15px)"}} className="daysLeftText">
            {daysLeft > 0 ? `Czas na rozwiązanie: ${daysLeft} dni` : `Zaległe przez: ${-daysLeft} dni`}
        </span>
    )
}

export default DaysToDeadlineSpan;