import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ls, LocalStorage } from "./localStorage";

type CartItem = {
  id: string;
  attributes: {
    [attrId: string]: string;
  };
  quantity: number;
};

const initialState: {
  items: CartItem[];
  miniCartOpen: boolean;
} = {
  items: LocalStorage.get(ls.cart, []),
  miniCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: string;
        attributes: {
          [attrId: string]: string;
        };
      }>
    ) => {
      const item = action.payload;

      let found = false;
      state.items.find((inCart) => {
        if (inCart.id !== item.id) return false;
        const sameAttrs = Object.keys(item.attributes).every(
          (attr) => inCart.attributes[attr] === item.attributes[attr]
        );
        if (!sameAttrs) return false;

        inCart.quantity++;
        found = true;
        return true;
      });

      if (!found) {
        state.items.push({
          id: item.id,
          attributes: item.attributes,
          quantity: 1,
        });
      }

      LocalStorage.set(ls.cart, state.items);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.items[index].quantity++;
      LocalStorage.set(ls.cart, state.items);
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.items[index].quantity <= 1) {
        state.items.splice(index, 1);
      } else {
        state.items[index].quantity--;
      }
      LocalStorage.set(ls.cart, state.items);
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
      LocalStorage.set(ls.cart, state.items);
    },
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  toggleMiniCart,
  emptyCart,
} = cartSlice.actions;
