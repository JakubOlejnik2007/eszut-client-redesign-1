import "./timeChartStyle.css"

const TimeChart = ({ procent }: { procent: number }) => <div className="slice" style={procent > 0 && procent <= 100 ? {
    background: `conic-gradient(#3498db 0% ${procent}%,
            transparent ${procent}%)`
} : {
    background: `conic-gradient(#fe0000 0% ${100}%,
transparent ${100}%)`
}}></div>

export default TimeChart;