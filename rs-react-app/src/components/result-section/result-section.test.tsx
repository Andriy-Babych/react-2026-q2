import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { afterEach, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ResultSection from './result-section';
import { useSelectedItemsStore } from '../../store/selected-items-store';

const renderResultSection = (ui: ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

afterEach(() => {
  useSelectedItemsStore.getState().clearSelectedItems();
});

test('renders item id name and description', () => {
  renderResultSection(
    <ResultSection
      results={[
        { id: 'FOMA0000264633', name: 'Abalone', description: 'Origin: true' },
      ]}
      onShowError={vi.fn()}
    />
  );

  expect(screen.getByText('FOMA0000264633')).toBeInTheDocument();
  expect(screen.getByText('Abalone')).toBeInTheDocument();
  expect(screen.getByText('Origin: true')).toBeInTheDocument();
});

test('renders No Such FOOD if array is empty', () => {
  renderResultSection(<ResultSection results={[]} onShowError={vi.fn()} />);

  expect(screen.getByText('No Such FOOD')).toBeInTheDocument();
});

test('selects and unselects an item with its checkbox', async () => {
  const user = userEvent.setup();

  renderResultSection(
    <ResultSection
      results={[
        { id: 'FOMA0000264633', name: 'Abalone', description: 'Origin: Earth' },
      ]}
      onShowError={vi.fn()}
    />
  );

  const checkbox = screen.getByRole('checkbox', { name: 'Select Abalone' });

  await user.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(useSelectedItemsStore.getState().selectedCount).toBe(1);

  await user.click(checkbox);

  expect(checkbox).not.toBeChecked();
  expect(useSelectedItemsStore.getState().selectedCount).toBe(0);
});
