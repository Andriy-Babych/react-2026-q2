import './result-section.css';
import ErrorButton from '../error-button/error-button';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelectedItemsStore } from '../../store/selected-items-store';
import type { ResultItem } from '../../types/food';

type ResultSectionProps = {
  results: ResultItem[];
  onShowError: () => void;
};

export default function ResultSection({
  results,
  onShowError,
}: ResultSectionProps) {
  const location = useLocation();
  const { id } = useParams();
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const toggleItem = useSelectedItemsStore((state) => state.toggleItem);

  return (
    <section className="result-section">
      {results.length === 0 ? (
        <div className="searchedItemNotFound">No Such FOOD</div>
      ) : (
        results.map((resultElement) => {
          const isActive = id === resultElement.id;
          const isItemSelected = Boolean(selectedItems[resultElement.id]);

          return (
            <article
              className={`result-item ${isActive ? 'active' : ''}`}
              key={resultElement.id}
            >
              <input
                aria-label={`Select ${resultElement.name}`}
                checked={isItemSelected}
                className="result-item-checkbox"
                onChange={() =>
                  toggleItem({
                    ...resultElement,
                    detailsUrl: `/details/${resultElement.id}`,
                  })
                }
                type="checkbox"
              />

              <Link
                className="result-item-link"
                to={`/details/${resultElement.id}${location.search}`}
              >
                <div className="result-item-content">
                  <div className="result-item_id">{resultElement.id}</div>

                  <div className="result-item_name">{resultElement.name}</div>

                  <div className="result-item_description">
                    {resultElement.description}
                  </div>
                </div>
              </Link>
            </article>
          );
        })
      )}

      <ErrorButton onShowError={onShowError} />
    </section>
  );
}
