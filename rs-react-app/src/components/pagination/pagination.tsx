import './pagination.css';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}: PaginationProps) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav className="pagination-wrapper" aria-label="Search results pagination">
      <button
        className="pagination-button previous"
        type="button"
        disabled={isFirstPage}
        onClick={onPreviousPage}
      >
        &lt; Previous
      </button>
      <span className="pagination-numeration">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="pagination-button next"
        type="button"
        disabled={isLastPage}
        onClick={onNextPage}
      >
        Next &gt;
      </button>
    </nav>
  );
}
