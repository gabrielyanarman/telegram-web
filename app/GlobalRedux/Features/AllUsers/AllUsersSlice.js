import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { firestore } from '@/app/firebase'
import { collection, getDocs, query } from 'firebase/firestore'

export const initialState = {
    value: [],
    loading: null
}

export const getAllUsersAsync = createAsyncThunk(
    'get/users',
    async () => {
        const q = query(collection(firestore, 'users'))
        const querySnapshot = await getDocs(q)
        let usersArr = []
        querySnapshot.forEach(doc => {
			usersArr.push(doc.data())
		})
        return usersArr
    }
)

export const AllUsersSlice = createSlice({
    name: "all/users",
    initialState,
    reducers: {
        addUser: (state,action) => {
            state.value.push(action.payload)
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllUsersAsync.pending,(state) => {
            state.loading = true
        })
        .addCase(getAllUsersAsync.fulfilled,(state,action) => {
            state.value = action.payload
            state.loading = false
        })
    }
})

export const {addUser} = AllUsersSlice.actions

export const AllUsersSelector = (state) => {
    return state.allUsers
}

export default AllUsersSlice.reducer