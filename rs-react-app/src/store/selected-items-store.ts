import { create } from 'zustand';
import type { SelectedItem } from '../types/food';

type SelectedItemsState = {
  selectedItems: Record<string, SelectedItem>;
  selectedCount: number;
  isSelected: (id: string) => boolean;
  toggleItem: (item: SelectedItem) => void;
  clearSelectedItems: () => void;
};

export const useSelectedItemsStore = create<SelectedItemsState>((set, get) => ({
  selectedItems: {},
  selectedCount: 0,
  isSelected: (id) => Boolean(get().selectedItems[id]),
  toggleItem: (item) =>
    set((state) => {
      const selectedItems = { ...state.selectedItems };

      if (selectedItems[item.id]) {
        delete selectedItems[item.id];
      } else {
        selectedItems[item.id] = item;
      }

      return {
        selectedItems,
        selectedCount: Object.keys(selectedItems).length,
      };
    }),
  clearSelectedItems: () =>
    set({
      selectedItems: {},
      selectedCount: 0,
    }),
}));
