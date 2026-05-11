import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import SearchPanel from './search-panel';

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

test('displays search term value', () => {
  render(
    <SearchPanel
      searchTerm="try"
      onSearchTermChange={vi.fn()}
      onSearch={vi.fn()}
    />
  );

  expect(screen.getByRole('searchbox')).toHaveValue('try');
});

test('onSearchTermChange callback called', async () => {
  const handleSearchTermChange = vi.fn();
  render(
    <SearchPanel
      searchTerm=""
      onSearchTermChange={handleSearchTermChange}
      onSearch={vi.fn()}
    />
  );

  const user = userEvent.setup();
  const input = screen.getByRole('searchbox');

  await user.type(input, 'pizza');

  expect(handleSearchTermChange).toHaveBeenCalledTimes(5);
});

test('search button click', async () => {
  const onSearch = vi.fn();
  render(
    <SearchPanel
      searchTerm=""
      onSearchTermChange={vi.fn()}
      onSearch={onSearch}
    />
  );

  const user = userEvent.setup();
  const searchButton = screen.getByRole('button', { name: 'Search' });

  await user.click(searchButton);

  expect(onSearch).toHaveBeenCalled();
});
