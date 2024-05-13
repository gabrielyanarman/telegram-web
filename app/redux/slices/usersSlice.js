import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useGetUsers } from '@/app/utils/hooks';

export const initialState = {
  data: {},
  loading: null,
};

export const getUsersAsync = createAsyncThunk(
  'get/users',
  async ({ limitUsers = 10, lastVisible }) => {
    const usersArr = await useGetUsers('uid', lastVisible, limitUsers);
    const result = {};
    usersArr.forEach((item) => {
      result[item.uid] = item;
    });
    return result;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          ...action.payload,
        };
        state.loading = false;
      })
      .addCase(getUsersAsync.rejected, () => {
        console.log('error');
      });
  },
});

export const usersSelector = (state) => {
  return state.users;
};

export default usersSlice.reducer;
