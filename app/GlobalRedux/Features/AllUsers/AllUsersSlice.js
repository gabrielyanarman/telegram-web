import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const initialState = []

export const getAllUsersAsync = createAsyncThunk(
    'get/users',
    async () => {

    }
)

export const AllUsersSlice = createSlice({
    name: "all/users",
    initialState,
    reducers: {
        
    },

    extraReducers: {
    
    }
})