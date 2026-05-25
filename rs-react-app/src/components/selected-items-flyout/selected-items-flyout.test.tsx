import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test, vi } from 'vitest';
import SelectedItemsFlyout from './selected-items-flyout';
import { useSelectedItemsStore } from '../../store/selected-items-store';

afterEach(() => {
  useSelectedItemsStore.getState().clearSelectedItems();
  vi.restoreAllMocks();
});

test('renders selected count and clears selected items', async () => {
  useSelectedItemsStore.getState().toggleItem({
    id: 'FOMA0000264633',
    name: 'Abalone',
    description: 'Origin: Earth',
    detailsUrl: '/details/FOMA0000264633',
  });

  const user = userEvent.setup();

  render(<SelectedItemsFlyout />);

  expect(screen.getByText('Selected items: 1')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Unselect all' }));

  expect(useSelectedItemsStore.getState().selectedCount).toBe(0);
});

test('downloads selected items as csv', async () => {
  useSelectedItemsStore.getState().toggleItem({
    id: 'FOMA0000264633',
    name: 'Abalone',
    description: 'Origin: Earth',
    detailsUrl: '/details/FOMA0000264633',
  });

  const createObjectUrl = vi
    .spyOn(URL, 'createObjectURL')
    .mockReturnValue('blob:test-url');
  const revokeObjectUrl = vi
    .spyOn(URL, 'revokeObjectURL')
    .mockImplementation(() => undefined);
  const click = vi
    .spyOn(HTMLAnchorElement.prototype, 'click')
    .mockImplementation(() => undefined);

  const user = userEvent.setup();

  render(<SelectedItemsFlyout />);

  await user.click(screen.getByRole('button', { name: 'Download' }));

  expect(createObjectUrl).toHaveBeenCalledWith(expect.any(Blob));
  expect(click).toHaveBeenCalledTimes(1);
  expect(revokeObjectUrl).toHaveBeenCalledWith('blob:test-url');
});
