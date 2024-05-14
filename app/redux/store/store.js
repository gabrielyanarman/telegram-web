'use client';

import usersReducer from '../slices/usersSlice';
import leftSearchReducer from '../slices/searchSlice';

const { configureStore } = require('@reduxjs/toolkit');

export const store = configureStore({
  reducer: {
    users: usersReducer,
    leftSearch: leftSearchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});
