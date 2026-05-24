import './result-section.css';
import ErrorButton from '../error-button/error-button';
import { Link, useLocation, useParams } from 'react-router-dom';

type ResultItem = {
  id: string;
  name: string;
  description: string;
};

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

  return (
    <section className="result-section">
      {results.length === 0 ? (
        <div className="searchedItemNotFound">No Such FOOD</div>
      ) : (
        results.map((resultElement) => {
          const isActive = id === resultElement.id;

          return (
            <Link
              className="result-item-link"
              to={`/details/${resultElement.id}${location.search}`}
              key={resultElement.id}
            >
              <div className={`result-item ${isActive ? 'active' : ''}`}>
                <div className="result-item_id">{resultElement.id}</div>

                <div className="result-item_name">{resultElement.name}</div>

                <div className="result-item_description">
                  {resultElement.description}
                </div>
              </div>
            </Link>
          );
        })
      )}

      <ErrorButton onShowError={onShowError} />
    </section>
  );
}
