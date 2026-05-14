import './result-section.css';
import ErrorButton from '../error-button/error-button';

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
  return (
    <section className="result-section">
      {results.length === 0 ? (
        <div className="searchedItemNotFound">No Such FOOD</div>
      ) : (
        results.map((resultElement) => (
          <div className="result-item" key={resultElement.id}>
            <div className="result-item_id">{resultElement.id}</div>
            <div className="result-item_name">{resultElement.name}</div>
            <div className="result-item_description">
              {resultElement.description}
            </div>
          </div>
        ))
      )}

      <ErrorButton onShowError={onShowError} />
    </section>
  );
}
