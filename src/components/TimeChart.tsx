import "./timeChartStyle.css"

const TimeChart = ({ procent }: { procent: number }) => <div className="slice" style={procent > 0 && procent <= 100 ? {
    background: `conic-gradient(#6bff3532 0% ${procent}%,
            #0000002a ${procent}%)`,

            
} : {
    background: `conic-gradient(#ff353532 0% ${100}%,
    transparent ${100}%)`
}
}></div>

export default TimeChart;