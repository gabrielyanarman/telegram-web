import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  value: '',
  searchTab: 'chats',
};

export const searchSlice = createSlice({
  name: 'left/column/Search',
  initialState,
  reducers: {
    changeSearchValue: (state, action) => {
      state.value = action.payload;
    },
    changeSearchTab: (state, action) => {
      state.searchTab = action.payload;
    },
  },
});

export const { changeSearchValue, changeSearchTab } = searchSlice.actions;

export const searchStateSelector = (state) => {
  return state.leftSearch;
};

export default searchSlice.reducer;
