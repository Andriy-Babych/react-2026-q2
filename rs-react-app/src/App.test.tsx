import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import App from './App';

test('shows loading while fetching data', () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => new Promise(() => {}))
  );

  render(<App />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('', async () => {
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

  render(<App />);

  expect(await screen.findByText("Abalone")).toBeInTheDocument();
  expect(screen.getByText("FOMA0000264633")).toBeInTheDocument();
  expect(screen.getByText("Origin: Earth")).toBeInTheDocument();
});
