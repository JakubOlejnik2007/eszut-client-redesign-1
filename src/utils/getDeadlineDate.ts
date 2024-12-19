const getDeadlineDate = (reportDate: Date, priority: number): Date => {
    return new Date(reportDate.getTime() + 43200000 * 2 ** (priority - 1));
}

export default getDeadlineDate;