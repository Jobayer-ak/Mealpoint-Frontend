// redux/middleware/loaderMiddleware.ts
import {
  isFulfilled,
  isPending,
  isRejected,
  Middleware,
} from '@reduxjs/toolkit';
import { hideLoader, showLoader } from '../features/loader/loaderSlice';

export const loaderMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action); //  pass action to the next middleware first

  if (isPending(action)) {
    store.dispatch(showLoader());
  } else if (isFulfilled(action) || isRejected(action)) {
    store.dispatch(hideLoader());
  }

  return result;
};
