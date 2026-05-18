import SearchPanel from '../../components/search-panel/search-panel';
import ResultSection from '../../components/result-section/result-section';
import Pagination from '../../components/pagination/pagination';

import { useState, type ChangeEvent, useEffect, useCallback } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { useLocalStorage } from '../../hooks/use-local-storage';

import './home-page.css';


type ResultItem = {
  id: string;
  name: string;
  description: string;
};

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', ''),
    [results, setResults] = useState<ResultItem[]>([]),
    [isLoading, setIsLoading] = useState(false),
    [error, setError] = useState(''),
    [lastSubmittedSearchTerm, setLastSubmittedSearchTerm] = useState(searchTerm),
    [shouldThrowError, setShouldThrowError] = useState(false);

  const handleInputTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePrevPageChange = () => {
    const newPage = currentPage - 1;
    if (newPage < 1) return;
    setSearchParams({ page: newPage.toString() });
  }

  const handleNextPageChange = () => {
    const newPage = currentPage + 1;
    setSearchParams({ page: newPage.toString() });
  }

  const loadResults = useCallback(async (searchTerm: string, currentPage: number): Promise<void> => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    setIsLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();

      params.append('pageNumber', (currentPage - 1).toString());
      params.append('pageSize', '10');

      if (normalizedSearchTerm) {
        params.append('name', normalizedSearchTerm);
      }

      const response = await fetch('https://stapi.co/api/v1/rest/food/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setTotalPages(data.page.totalPages);

      const results: ResultItem[] = data.foods.map(
        (foodItem: { uid: string; name: string; earthlyOrigin?: string }) => ({
          id: foodItem.uid,
          name: foodItem.name,
          description: foodItem.earthlyOrigin
            ? `Origin: ${foodItem.earthlyOrigin}`
            : 'Unknown origin',
        })
      );

      setResults(results);

      setIsLoading(false);
    } catch {
      setError('Something went wrong. Please try again.');
      setResults([]);
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (): void => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    if (normalizedSearchTerm === lastSubmittedSearchTerm) return;

    setSearchTerm(normalizedSearchTerm);
    setLastSubmittedSearchTerm(normalizedSearchTerm);

    setSearchParams({ page: '1' });
  };

  useEffect(() => {
    loadResults(lastSubmittedSearchTerm, currentPage);
  }, [loadResults, lastSubmittedSearchTerm, currentPage]);

  if (shouldThrowError) throw new Error('Test application error');

  return (
    <>
      <SearchPanel
        searchTerm={searchTerm}
        onSearchTermChange={handleInputTermChange}
        onSearch={handleSearch}
      />

      {isLoading && <p className="api-status">Loading...</p>}

      {error && <p className="api-status">{error}</p>}

      {!isLoading && !error && (
        <div className="home-content">
          <div className="results-panel">
            <ResultSection
              onShowError={() => setShouldThrowError(true)}
              results={results}
            />

            {results.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPreviousPage={handlePrevPageChange}
                onNextPage={handleNextPageChange}
              />
            )}
          </div>

          <div className="details-panel">
            <Outlet />
          </div>
        </div>
      )}

    </>
  );
}

export default HomePage;