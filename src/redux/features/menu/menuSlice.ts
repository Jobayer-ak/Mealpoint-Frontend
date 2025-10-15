import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  priceRange: number;
  inStockOnly: boolean;
  selectedCategory: string | null; // null means "All"
}

const initialState: ProductState = {
  priceRange: 150, // default max price
  inStockOnly: false,
  selectedCategory: null,
};

const menuSlice = createSlice({
  name: 'productFilters',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
    toggleInStock: (state) => {
      state.inStockOnly = !state.inStockOnly;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    resetFilters: (state) => {
      state.priceRange = 150;
      state.inStockOnly = false;
      state.selectedCategory = null;
    },
  },
});

export const { setPriceRange, toggleInStock, setCategory, resetFilters } =
  menuSlice.actions;

export default menuSlice.reducer;
