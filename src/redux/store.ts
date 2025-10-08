import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import loaderReducer from './features/loader/loaderSlice';
import useReducer from './features/user/userSlice';
import { loaderMiddleware } from './middleware/loaderMiddleware';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user: useReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, loaderMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
