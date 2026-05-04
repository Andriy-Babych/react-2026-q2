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
      <form className="search-panel" onSubmit={(event) => {
        event.preventDefault();
        this.props.onSearch();
      }}>
        <button
          className="search-button"
          type="submit"
          aria-label="Search"
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
      </form>
    );
  }
}
