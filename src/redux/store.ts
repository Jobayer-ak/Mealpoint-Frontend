import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import useReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    user: useReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
