const dayToDeadline = (reportDate: Date, priority: number) => {
    return parseFloat((((reportDate.getTime() + 43200000 * 2 ** (priority - 1)) - (new Date(Date.now()).getTime())) / (1000 * 60 * 60 * 24)).toFixed(1));
}

export default dayToDeadline;