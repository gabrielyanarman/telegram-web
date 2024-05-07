'use client';

import selectedUserReducer from '../slices/selectedUserSlice';
import usersReducer from '../slices/usersSlice';
import chatsReducer from '../slices/chatsSlice';
import leftSearchReducer from '../slices/searchSlice';

const { configureStore } = require('@reduxjs/toolkit');

export const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
    users: usersReducer,
    /*chats: chatsReducer,*/
    leftSearch: leftSearchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});
