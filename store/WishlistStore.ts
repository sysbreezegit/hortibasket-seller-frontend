import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  product: CartProducts;
  variant: string | null;
  quantity: number;
  priceAtCart: number;
  totalPrice: number;
}

interface CartProducts {
  _id: string; // Added _id
  productName: string;
  images?: string[];
}
interface CartState {
  items: CartItem[];
  wishlistTotal: number;
  setwishlist: (items: CartItem[]) => void;
  addTowishlist: (item: CartItem) => void;
  removeFromwishlist: (product: string, variant: string | null) => void;
  updateQuantity: (
    product: string,
    variant: string | null,
    quantity: number
  ) => void;
  clearwishlist: () => void;
  calculateTotal: () => void;
}

export const useWishlistStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlistTotal: 0,

      setwishlist: (items) => {
        set({ items }, false);
        get().calculateTotal();
      },

      addTowishlist: (item) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (i) => i.product._id === item.product._id && i.variant === item.variant
        );

        let updatedItems;
        if (existingIndex !== -1) {
          const existing = items[existingIndex];
          const updatedItem = {
            ...existing,
            quantity: existing.quantity + item.quantity,
            totalPrice:
              (existing.quantity + item.quantity) * existing.priceAtCart,
          };
          updatedItems = [...items];
          updatedItems[existingIndex] = updatedItem;
        } else {
          updatedItems = [...items, item];
        }

        set({ items: updatedItems }, false);
        get().calculateTotal();
      },

      removeFromwishlist: (productId, variant) => {
        set(
          (state) => ({
            items: state.items.filter((item) => {
              if (variant) {
                return !(
                  item.product._id === productId && item.variant === variant
                );
              }
              return item.product._id !== productId;
            }),
          }),
          false
        );
        get().calculateTotal();
      },
      updateQuantity: (product, variant, quantity) => {
        set(
          (state) => ({
            items: state.items.map((item) =>
              item.product._id === product && item.variant === variant
                ? {
                  ...item,
                  quantity,
                  totalPrice: quantity * item.priceAtCart,
                }
                : item
            ),
          }),
          false
        );
        get().calculateTotal();
      },

      clearwishlist: () => {
        set({ items: [], wishlistTotal: 0 });
      },

      calculateTotal: () => {
        const { items } = get();
        const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
        set({ wishlistTotal: total });
      },
    }),
    {
      name: "guest-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
