import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import NotFoundPage from './not-found-page';

test('renders not found page with home link', () => {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  expect(screen.getByText(/does not exist/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Go Back' })).toHaveAttribute(
    'href',
    '/?page=1'
  );
});
