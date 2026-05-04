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
};

class App extends Component<object, AppState> {
  state: AppState = {
    searchTerm: '',
    results: [],
  };

  handleInputTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;

    this.setState({
      searchTerm: newSearchTerm,
    });

    localStorage.setItem('searchTerm', newSearchTerm);
  };

  loadResults = async (searchTerm: string): Promise<void> => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

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
    });
  };

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';

    this.setState({
      searchTerm: savedSearchTerm,
    });

    this.loadResults(savedSearchTerm);
  }

  render(): ReactNode {
    return (
      <>
        <SearchPanel
          searchTerm={this.state.searchTerm}
          onSearchTermChange={this.handleInputTermChange}
        />
        <ResultSection results={this.state.results} />
      </>
    );
  }
}

export default App;
