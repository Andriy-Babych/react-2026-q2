import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ResultSection from './result-section';

const renderResultSection = (ui: ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

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
