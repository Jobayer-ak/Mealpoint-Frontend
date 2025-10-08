// redux/middleware/loaderMiddleware.ts
import {
  isFulfilled,
  isPending,
  isRejected,
  Middleware,
} from '@reduxjs/toolkit';
import { hideLoader, showLoader } from '../features/loader/loaderSlice';

export const loaderMiddleware: Middleware = (store) => (next) => (action) => {
  if (isPending(action)) {
    store.dispatch(showLoader());
  }
  if (isFulfilled(action) || isRejected(action)) {
    store.dispatch(hideLoader());
  }
  return next(action);
};
