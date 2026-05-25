import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ErrorButton from './error-button';

test('renders error button', () => {
  render(<ErrorButton onShowError={vi.fn()} />);

  expect(
    screen.getByRole('button', { name: 'error-button' })
  ).toBeInTheDocument();
});

test('calls onShowError when button clicked', async () => {
  const onShowError = vi.fn();
  render(<ErrorButton onShowError={onShowError} />);

  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: 'error-button' }));

  expect(onShowError).toHaveBeenCalled();
});
