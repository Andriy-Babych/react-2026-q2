import { render, screen } from '@testing-library/react';
import { test, expect, vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import SearchPanel from './search-panel';

afterEach(() => {
    cleanup();
})

test('Renders search panel', () => {
  render(
    <SearchPanel
      searchTerm=""
      onSearchTermChange={vi.fn()}
      onSearch={vi.fn()}
    />
  );

  expect(screen.getByRole('searchbox')).toBeInTheDocument();
});

test("displays search term value", () => {
    render(
        <SearchPanel
          searchTerm="try"
          onSearchTermChange={vi.fn()}
          onSearch={vi.fn()}
        />
      );

    expect(screen.getByRole('searchbox')).toHaveValue("try")
})
