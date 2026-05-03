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

const mockResults: ResultItem[] = [
  {
    id: '1',
    name: 'Pikachu',
    description: 'Electric type Pokémon',
  },
  {
    id: '2',
    name: 'Bulbasaur',
    description: 'Grass and poison type Pokémon',
  },
  {
    id: '3',
    name: 'Charmander',
    description: 'Fire type Pokémon',
  },
];

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

  loadResults = (searchTerm: string): void => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    const filteredResults = normalizedSearchTerm
      ? mockResults.filter((item) =>
          item.name.toLowerCase().includes(normalizedSearchTerm)
        )
      : mockResults;

    this.setState({
      results: filteredResults,
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
