import './pagination.css';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPreviousPage: (newPage: number) => void;
    onNextPage: (newPage: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPreviousPage, onNextPage }: PaginationProps) {
    return (
        <div className="pagination-wrapper">
            <button className="pagination-button previous" disabled={currentPage === 1} onClick={() => onPreviousPage(currentPage - 1)}>
                &lt; Previous
            </button>
            <span className="pagination-numeration">Page {currentPage} of {totalPages}</span>
            <button className="pagination-button next" disabled={currentPage === totalPages} onClick={() => onNextPage(currentPage + 1)}>
                Next &gt;
            </button>
        </div>
    );
}