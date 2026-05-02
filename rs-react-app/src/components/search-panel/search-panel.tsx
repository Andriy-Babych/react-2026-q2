import { Component, type ChangeEvent, type ReactNode } from 'react';
import './search-panel.css';

type SearchPanelState = {
  searchTerm: string;
};

export default class SearchPanel extends Component<object, SearchPanelState> {
  state: SearchPanelState = {
    searchTerm: '',
  };

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm');

    if (savedSearchTerm) {
      this.setState({
        searchTerm: savedSearchTerm,
      });
    }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchItem = event.target.value;
    this.setState({
      searchTerm: newSearchItem,
    });

    localStorage.setItem('searchTerm', newSearchItem);
  };

  render(): ReactNode {
    return (
      <section className="search-panel">
        <button className="search-button" type="button" aria-label="Search">
          <span className="material-symbols-outlined">search</span>
        </button>
        <input
          className="search-input-field"
          type="search"
          placeholder="Search"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
      </section>
    );
  }
}
