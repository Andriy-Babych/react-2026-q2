import { render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderApp = () =>
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

test('shows loading while fetching data', () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => new Promise(() => {}))
  );

  renderApp();

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders results after successful fetch', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          foods: [
            {
              uid: 'FOMA0000264633',
              name: 'Abalone',
              earthlyOrigin: 'Earth',
            },
          ],
        }),
      })
    )
  );

  renderApp();

  expect(await screen.findByText('Abalone')).toBeInTheDocument();
  expect(screen.getByText('FOMA0000264633')).toBeInTheDocument();
  expect(screen.getByText('Origin: Earth')).toBeInTheDocument();
});

test('shows error message after failed fetch', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: async () => ({}),
      })
    )
  );

  renderApp();

  expect(
    await screen.findByText('Something went wrong. Please try again.')
  ).toBeInTheDocument();
});

test('loads saved search term from localStorage', async () => {
  localStorage.setItem('searchTerm', 'pizza');

  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          foods: [],
        }),
      })
    )
  );

  renderApp();

  expect(screen.getByRole('searchbox')).toHaveValue('pizza');
});

test('saves search term to localStorage after search', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          foods: [],
        }),
      })
    )
  );

  const user = userEvent.setup();

  renderApp();

  const input = screen.getByRole('searchbox');
  await user.type(input, 'Pizza');

  await user.click(screen.getByRole('button', { name: 'Search' }));

  expect(localStorage.getItem('searchTerm')).toBe('pizza');
});

test('requests the next API page when pagination advances', async () => {
  const fetchMock = vi.fn(
    async (_input: RequestInfo | URL, _init?: RequestInit) => {
      void _input;
      void _init;

      return {
      ok: true,
      json: async () => ({
        page: {
          totalPages: 2,
        },
        foods: [
          {
            uid: 'FOMA0000264633',
            name: 'Abalone',
            earthlyOrigin: 'Earth',
          },
        ],
      }),
      } as Response;
    }
  );

  vi.stubGlobal('fetch', fetchMock);

  const user = userEvent.setup();

  renderApp();

  expect(await screen.findByText('Abalone')).toBeInTheDocument();
  expect(fetchMock.mock.calls[0][0]).toContain('pageNumber=0');

  await user.click(screen.getByRole('button', { name: 'Next >' }));

  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  expect(fetchMock.mock.calls[1][0]).toContain('pageNumber=1');
});
