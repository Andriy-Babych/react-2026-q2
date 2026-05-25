import SearchPanel from '../../components/search-panel/search-panel';
import ResultSection from '../../components/result-section/result-section';
import Pagination from '../../components/pagination/pagination';

import { useState, type ChangeEvent, useEffect, useCallback } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { useLocalStorage } from '../../hooks/use-local-storage';
import type { ResultItem } from '../../types/food';

import './home-page.css';

type FoodSearchItem = {
  uid: string;
  name: string;
  earthlyOrigin?: string;
};

type FoodSearchResponse = {
  foods?: FoodSearchItem[];
  page?: {
    totalPages?: number;
  };
};

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page') || '1');
  const currentPage =
    Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', ''),
    [results, setResults] = useState<ResultItem[]>([]),
    [isLoading, setIsLoading] = useState(false),
    [error, setError] = useState(''),
    [lastSubmittedSearchTerm, setLastSubmittedSearchTerm] =
      useState(searchTerm),
    [shouldThrowError, setShouldThrowError] = useState(false);

  const handleInputTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePrevPageChange = () => {
    const newPage = currentPage - 1;
    if (newPage < 1) return;
    setSearchParams({ page: newPage.toString() });
  };

  const handleNextPageChange = () => {
    const newPage = currentPage + 1;
    if (newPage > totalPages) return;
    setSearchParams({ page: newPage.toString() });
  };

  const loadResults = useCallback(
    async (
      searchTerm: string,
      currentPage: number,
      signal: AbortSignal
    ): Promise<void> => {
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();

      setIsLoading(true);
      setError('');

      try {
        const queryParams = new URLSearchParams({
          pageNumber: (currentPage - 1).toString(),
          pageSize: '10',
        });
        const bodyParams = new URLSearchParams();

        if (normalizedSearchTerm) {
          bodyParams.append('name', normalizedSearchTerm);
        }

        const response = await fetch(
          `https://stapi.co/api/v1/rest/food/search?${queryParams.toString()}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: bodyParams,
            signal,
          }
        );

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = (await response.json()) as FoodSearchResponse;
        if (signal.aborted) return;

        const foods = data.foods ?? [];
        setTotalPages(Math.max(data.page?.totalPages ?? 1, 1));

        const results: ResultItem[] = foods.map((foodItem) => ({
          id: foodItem.uid,
          name: foodItem.name,
          description: foodItem.earthlyOrigin
            ? `Origin: ${foodItem.earthlyOrigin}`
            : 'Unknown origin',
        }));

        setResults(results);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        setError('Something went wrong. Please try again.');
        setResults([]);
        setTotalPages(1);
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    []
  );

  const handleSearch = (): void => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    if (normalizedSearchTerm === lastSubmittedSearchTerm) return;

    setSearchTerm(normalizedSearchTerm);
    setLastSubmittedSearchTerm(normalizedSearchTerm);

    setSearchParams({ page: '1' });
  };

  useEffect(() => {
    const controller = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadResults(lastSubmittedSearchTerm, currentPage, controller.signal);

    return () => {
      controller.abort();
    };
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
