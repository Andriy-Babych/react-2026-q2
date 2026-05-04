import { Component, type ChangeEvent, type ReactNode } from 'react';
import './search-panel.css';

type SearchPanelProps = {
  searchTerm: string;
  onSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export default class SearchPanel extends Component<SearchPanelProps> {
  render(): ReactNode {
    return (
      <section className="search-panel">
        <button
          className="search-button"
          type="button"
          aria-label="Search"
          onClick={this.props.onSearch}
        >
          <span className="material-symbols-outlined">search</span>
        </button>
        <input
          className="search-input-field"
          type="search"
          placeholder="Search"
          value={this.props.searchTerm}
          onChange={this.props.onSearchTermChange}
        />
      </section>
    );
  }
}
