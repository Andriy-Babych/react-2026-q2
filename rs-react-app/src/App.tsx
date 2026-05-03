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
    results: [
      {
        id: '1',
        name: 'pickachu',
        description: 'very powerfull pockemon',
      },
    ],
  };

  handleInputTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;

    this.setState({
      searchTerm: newSearchTerm,
    });

    localStorage.setItem('searchTerm', newSearchTerm);
  };

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm');

    if (savedSearchTerm) {
      this.setState({
        searchTerm: savedSearchTerm,
      });
    }
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
