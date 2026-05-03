import './App.css';
import SearchPanel from './components/search-panel/search-panel';
import ResultSection from './components/result-section/result-section';
import { Component, type ReactNode } from 'react';

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

  render(): ReactNode {
    return (
      <>
        <SearchPanel searchTerm={this.state.searchTerm}/>
        <ResultSection />
      </>
    );
  }
}

export default App;
