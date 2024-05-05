import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore } from '@/app/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export const initialState = {
  data: {},
  loading: null,
};

export const getUsersAsync = createAsyncThunk('get/users', async () => {
  try {
    const q = query(collection(firestore, 'users'));
    const querySnapshot = await getDocs(q);
    let usersArr = [];
    let result = {};
    querySnapshot.forEach((doc) => {
      usersArr.push(doc.data());
    });
    usersArr.forEach((user) => {
      result[user.uid] = user;
    });
    return result;
  } catch (error) {
    console.log(error);
  }
});

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
        state.data = action.payload;
        state.loading = false;
      });
  },
});

export const usersSelector = (state) => {
  return state.users;
};

export default usersSlice.reducer;
