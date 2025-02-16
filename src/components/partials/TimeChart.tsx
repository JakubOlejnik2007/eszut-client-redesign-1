import "./timeChartStyle.css"

const TimeChart = ({ procent }: { procent: number }) => <div className="slice" style={procent > 0 && procent <= 100 ? {
    background: `conic-gradient(#6bff3532 0% ${procent}%,
            #0000002a ${procent}%)`,


} : {
    background: `conic-gradient(#6f0013 0% 100%,
    #0000002a 100%)`,
}
}></div>

export default TimeChart;