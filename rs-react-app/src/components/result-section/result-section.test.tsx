import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ResultSection from './result-section';

test('renders item id name and description', () => {
  render(
    <ResultSection
      results={[
        { id: 'FOMA0000264633', name: 'Abalone', description: 'Origin: true' },
      ]}
      onShowError={vi.fn()}
    />
  );

  expect(screen.getByText("FOMA0000264633")).toBeInTheDocument();
  expect(screen.getByText("Abalone")).toBeInTheDocument();
  expect(screen.getByText("Origin: true")).toBeInTheDocument();
});


test("renders No Such FOOD if array is empty", () => {
    render(
        <ResultSection results={[]} onShowError={vi.fn()}/>
    )

    expect(screen.getByText("No Such FOOD")).toBeInTheDocument();
})

test("renders error when click showError button", async () => {
    const onShowError = vi.fn();
    render(
        <ResultSection results={[]} onShowError={onShowError}/>
    )

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));

    expect(onShowError).toHaveBeenCalled();
})