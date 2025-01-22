const timeSpentPercentage = (reportDate: Date, priority: number) => {
    const deadline = reportDate.getTime() + 43200000 * 2 ** (priority - 1);
    const now = Date.now();
    const totalDuration = deadline - reportDate.getTime();
    const timeElapsed = now - reportDate.getTime();
    return 100 - parseFloat(((timeElapsed / totalDuration) * 100).toFixed(1));
}

export default timeSpentPercentage;