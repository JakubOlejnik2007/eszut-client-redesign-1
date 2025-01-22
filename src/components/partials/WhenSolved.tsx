interface IWhenSolved {
    dateOfSolved: number;
}

const WhenSolved = ({ dateOfSolved }: IWhenSolved) => {

    const whenSolvedDate = new Date(dateOfSolved);

    return (
        <span style={{ fontSize: "15px", color: "var(--secondaryText)" }}>
            Rozwiązano: {whenSolvedDate.toLocaleString("pl")}
        </span>
    )
}

export default WhenSolved;