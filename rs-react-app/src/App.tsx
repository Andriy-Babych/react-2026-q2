import './App.css';
import SearchPanel from './components/search-panel/search-panel';
import ResultSection from './components/result-section/result-section';
import { Component, type ChangeEvent, type ReactNode } from 'react';

type ResultItem = {
  id: string;
  name: string;
  description: string;
};

type AppState = {
  searchTerm: string;
  results: ResultItem[];
  isLoading: boolean;
  error: string;
  lastSubmittedSearchTerm: string;
};

class App extends Component<object, AppState> {
  state: AppState = {
    searchTerm: '',
    results: [],
    isLoading: false,
    error: '',
    lastSubmittedSearchTerm: '',
  };

  handleInputTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;

    this.setState({
      searchTerm: newSearchTerm,
    });
  };

  loadResults = async (searchTerm: string): Promise<void> => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    this.setState({
      isLoading: true,
      error: '',
    });

    try {
      const params = new URLSearchParams();

      params.append('pageNumber', '0');
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

      const results: ResultItem[] = data.foods.map(
        (foodItem: { uid: string; name: string; earthlyOrigin?: string }) => ({
          id: foodItem.uid,
          name: foodItem.name,
          description: foodItem.earthlyOrigin
            ? `Origin: ${foodItem.earthlyOrigin}`
            : 'Unknown origin',
        })
      );

      this.setState({
        results,
        isLoading: false,
      });
    } catch {
      this.setState({
        error: 'Something went wrong. Please try again.',
        results: [],
        isLoading: false,
      });
    }
  };

  handleSearch = (): void => {
    const normalizedSearchTerm = this.state.searchTerm.toLowerCase().trim();

    if (normalizedSearchTerm === this.state.lastSubmittedSearchTerm) return;

    this.setState({
      searchTerm: normalizedSearchTerm,
      lastSubmittedSearchTerm: normalizedSearchTerm,
    });

    localStorage.setItem('searchTerm', normalizedSearchTerm);

    this.loadResults(normalizedSearchTerm);
  };

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    const normalizedSearchTerm = savedSearchTerm.toLowerCase().trim();

    this.setState({
      searchTerm: normalizedSearchTerm,
      lastSubmittedSearchTerm: normalizedSearchTerm,
    });

    this.loadResults(normalizedSearchTerm);
  }

  render(): ReactNode {
    const { results, isLoading, error, searchTerm } = this.state;

    return (
      <>
        <SearchPanel
          searchTerm={searchTerm}
          onSearchTermChange={this.handleInputTermChange}
          onSearch={this.handleSearch}
        />

        {isLoading && <p className="api-status">Loading...</p>}

        {error && <p className="api-status">{error}</p>}

        {!isLoading && !error && <ResultSection results={results} />}
      </>
    );
  }
}

export default App;
