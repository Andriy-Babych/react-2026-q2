import { render, screen } from '@testing-library/react';
import { Component, type ReactNode } from 'react';
import { test, expect, vi } from 'vitest';
import ErrorBoundary from './error-boundary';

class BrokenComponent extends Component {
  render(): ReactNode {
    throw new Error('Test error');

    return null;
  }
}

test('renders children when there is no error', () => {
  render(
    <ErrorBoundary>
      <p>Child content</p>
    </ErrorBoundary>
  );

  expect(screen.getByText('Child content')).toBeInTheDocument();
});

test('renders fallback UI when child component throws error', () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);

  render(
    <ErrorBoundary>
      <BrokenComponent />
    </ErrorBoundary>
  );

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

  consoleErrorSpy.mockRestore();
});
