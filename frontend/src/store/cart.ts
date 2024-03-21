import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { exp, LocalStorageValue } from './localStorage';

export type CartItem = {
  id: string;
  attributes: Record<string, string>;
  quantity: number;
};

type CartItemPayload = Omit<CartItem, 'quantity'>;

const lsCart = new LocalStorageValue<CartItem[]>('cart', [], exp.days(1));

const initialState: {
  items: CartItem[];
  miniCartOpen: boolean;
} = {
  items: lsCart.get(),
  miniCartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',

  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<CartItemPayload>) => {
      const newItem = action.payload;

      const inCart = state.items.find((item) => {
        return (
          item.id === newItem.id &&
          Object.keys(newItem.attributes).every(
            (attr) => item.attributes[attr] === newItem.attributes[attr],
          )
        );
      });

      if (inCart) {
        inCart.quantity++;
      } else {
        state.items.push({
          id: newItem.id,
          attributes: newItem.attributes,
          quantity: 1,
        });
      }

      lsCart.set(state.items);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const item = state.items[index];
      if (item) item.quantity++;
      lsCart.set(state.items);
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const item = state.items[index];
      if (item && item.quantity <= 1) {
        state.items.splice(index, 1);
      } else if (item) {
        item.quantity--;
      }
      lsCart.set(state.items);
    },

    toggleMiniCart: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.miniCartOpen = action.payload;
      } else {
        state.miniCartOpen = !state.miniCartOpen;
      }
    },

    emptyCart: (state) => {
      state.items = [];
      lsCart.set(state.items);
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, increaseQuantity, decreaseQuantity, toggleMiniCart, emptyCart } =
  cartSlice.actions;
