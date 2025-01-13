interface PaginationProps {
    setPage: (page: number) => void;
    page: number;
    maxPage: number;
}

const Pagination = ({ setPage, page, maxPage }: PaginationProps) => {
    return (
        <div className="pagination">
            <button className="mainButton" onClick={() => setPage(1)}>&lt;&lt;</button>
            <button className="mainButton" onClick={() => setPage(page > 1 ? page - 1 : page)}>&lt;</button>
            <button className="mainButton" onClick={() => setPage(page < maxPage ? page + 1 : page)}>&gt;</button>
            <button className="mainButton" onClick={() => setPage(maxPage)}>&gt;&gt;</button>
            <p>{page} z {maxPage}</p>
        </div>
    )
}

export default Pagination;