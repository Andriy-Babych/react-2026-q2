import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import AboutPage from './about-page';

test('renders project information', () => {
  render(<AboutPage />);

  expect(screen.getByRole('heading', { name: 'About This Project' })).toBeInTheDocument();
  expect(screen.getByText(/Andriy Babych/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /RS School React Course/ })).toHaveAttribute(
    'href',
    'https://app.rs.school/course/stats?course=react-2026-q2'
  );
});
