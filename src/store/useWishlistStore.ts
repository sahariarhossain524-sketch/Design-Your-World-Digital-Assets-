import { create } from 'zustand';
import type { Product } from '@/types';

interface WishlistStore {
  items: Product[];
  toggleItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  toggleItem: (product) => {
    set((state) => {
      const exists = state.items.find((p) => p.id === product.id);
      if (exists) {
        return { items: state.items.filter((p) => p.id !== product.id) };
      }
      return { items: [...state.items, product] };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((p) => p.id !== productId),
    }));
  },

  isInWishlist: (productId) => {
    return get().items.some((p) => p.id === productId);
  },
}));
