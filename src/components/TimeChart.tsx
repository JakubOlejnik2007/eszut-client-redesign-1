import "./timeChartStyle.css"

const TimeChart = ({procent}: {procent: number}) => <div className="slice" style={{
    background: `conic-gradient(#3498db 0% ${procent}%,
            transparent ${procent}%)`
}}></div>

export default TimeChart;