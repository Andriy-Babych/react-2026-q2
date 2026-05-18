import { type ChangeEvent } from 'react';
import './search-panel.css';

type SearchPanelProps = {
  searchTerm: string;
  onSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export default function SearchPanel({
  searchTerm,
  onSearchTermChange,
  onSearch,
}: SearchPanelProps) {
  return (
    <form
      className="search-panel"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <input
        className="search-input-field"
        type="search"
        placeholder="Search Food"
        value={searchTerm}
        onChange={onSearchTermChange}
      />

      <button className="search-button" type="submit" aria-label="Search">
        <span className="material-symbols-outlined">search</span>
      </button>
    </form>
  );
}
