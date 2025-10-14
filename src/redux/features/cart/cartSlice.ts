import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Each product in the cart
export interface ICartItem {
  id: string; // Your business product ID (e.g. M-103)
  mongoId: string; // Optional MongoDB _id
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  size?: string | null;
  hasVariants: boolean;
  totalPrice: number; // price * quantity
}

// Cart state
interface CartState {
  items: ICartItem[];
  totalAmount: number;
}

// Initial state
const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

// Create slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const newItem = action.payload;

      // Find existing item by id + size (so "medium" and "large" are separate items)
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        // Update quantity and total
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push(newItem);
      }

      // Recalculate total cart amount
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      // Filter out the removed item
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id)
      );

      // Update total
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
    },

    increaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const target = state.items.find((item) => item.id === action.payload.id);

      if (target) {
        target.quantity += 1;
        target.totalPrice = target.price * target.quantity;
      }

      state.totalAmount = state.items.reduce((acc, i) => acc + i.totalPrice, 0);
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{ id: string; size?: string | null }>
    ) => {
      const target = state.items.find((item) => item.id === action.payload.id);

      if (target && target?.quantity > 1) {
        target.quantity -= 1;
        target.totalPrice = target.price * target.quantity;
      }

      state.totalAmount = state.items.reduce((acc, i) => acc + i.totalPrice, 0);
    },

    // updateQuantity: (
    //   state,
    //   action: PayloadAction<{
    //     id: string;
    //     size?: string | null;
    //     quantity: number;
    //   }>
    // ) => {
    //   const item = state.items.find(
    //     (i) =>
    //       i.id === action.payload.id && i.size === (action.payload.size ?? null)
    //   );

    //   if (item) {
    //     item.quantity = action.payload.quantity;
    //     item.totalPrice = item.price * item.quantity;
    //   }

    //   state.totalAmount = state.items.reduce((acc, i) => acc + i.totalPrice, 0);
    // },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
