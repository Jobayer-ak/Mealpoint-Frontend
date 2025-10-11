import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from './api/apiSlice'; // keep RTK Query if you use it
import { loaderMiddleware } from './middleware/loaderMiddleware';

// Feature reducers
import cartReducer from './features/cart/cartSlice';
// import errorReducer from './features/error/errorSlice';
import loaderReducer from './features/loader/loaderSlice';
import userReducer from './features/user/userSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // persist only cart slice
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  loader: loaderReducer,
  // error: errorReducer,
  [api.reducerPath]: api.reducer, // include RTK Query if used
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(api.middleware, loaderMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

// Typed hooks support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
