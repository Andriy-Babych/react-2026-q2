import './selected-items-flyout.css';
import { useSelectedItemsStore } from '../../store/selected-items-store';
import type { SelectedItem } from '../../types/food';

const csvHeaders = ['id', 'name', 'description', 'detailsUrl'];

function escapeCsvCell(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}

function createCsv(items: SelectedItem[]): string {
  const rows = items.map((item) =>
    [
      item.id,
      item.name,
      item.description,
      new URL(item.detailsUrl, window.location.origin).toString(),
    ]
      .map(escapeCsvCell)
      .join(',')
  );

  return [csvHeaders.join(','), ...rows].join('\n');
}

function downloadSelectedItems(items: SelectedItem[]): void {
  const csv = createCsv(items);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${items.length}_items.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function SelectedItemsFlyout() {
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const selectedCount = useSelectedItemsStore((state) => state.selectedCount);
  const clearSelectedItems = useSelectedItemsStore(
    (state) => state.clearSelectedItems
  );
  const items = Object.values(selectedItems);

  if (selectedCount === 0) return null;

  return (
    <aside className="selected-items-flyout" aria-label="Selected items">
      <span className="selected-items-count">
        Selected items: {selectedCount}
      </span>
      <div className="selected-items-actions">
        <button type="button" onClick={clearSelectedItems}>
          Unselect all
        </button>
        <button type="button" onClick={() => downloadSelectedItems(items)}>
          Download
        </button>
      </div>
    </aside>
  );
}
