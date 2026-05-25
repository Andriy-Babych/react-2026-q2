import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import DetailsPage from './details-page';

function renderDetailsPage(initialPath = '/details/FOMA0000264633?page=2') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
}

test('renders fetched food details', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          food: {
            uid: 'FOMA0000264633',
            name: 'Abalone',
            earthlyOrigin: 'Earth',
          },
        }),
      })
    )
  );

  renderDetailsPage();

  expect(await screen.findByRole('heading', { name: 'Abalone' })).toBeInTheDocument();
  expect(screen.getByText('Earthly Origin: Earth')).toBeInTheDocument();
});

test('renders details error state', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: async () => ({}),
      })
    )
  );

  renderDetailsPage();

  expect(await screen.findByText('Failed to fetch details')).toBeInTheDocument();
});

test('close button returns to the current results page', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          food: {
            uid: 'FOMA0000264633',
            name: 'Abalone',
          },
        }),
      })
    )
  );

  const user = userEvent.setup();

  renderDetailsPage();

  await screen.findByRole('heading', { name: 'Abalone' });
  await user.click(screen.getByRole('button', { name: 'Close' }));

  expect(screen.getByText('Home page')).toBeInTheDocument();
});
