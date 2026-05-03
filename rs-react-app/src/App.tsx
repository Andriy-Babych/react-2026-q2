import './App.css';
import SearchPanel from './components/search-panel/search-panel';
import ResultSection from './components/result-section/result-section';
import { Component, type ReactNode } from 'react';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <SearchPanel />
        <ResultSection />
      </>
    );
  }
}

export default App;
