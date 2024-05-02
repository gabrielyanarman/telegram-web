import { firestore } from "@/app/firebase"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, getDocs, query, where } from "firebase/firestore"

export const initialState = {
    value: [],
    loading: false
}

export const getChatsForUserAsync = createAsyncThunk(
    'get/user/chats',
    async (uid) => {
        try {
            const q = query(collection(firestore, 'chats'), where('participants', 'array-contains', uid))
            const querySnapshot = await getDocs(q)
            let userChats = [];
            querySnapshot.forEach(chat => userChats.push(chat.data()))
            return userChats
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const ChatListSlice = createSlice({
    name: 'chatList',
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getChatsForUserAsync.pending,(state) => {
                state.loading = true
            })
            .addCase(getChatsForUserAsync.fulfilled,(state,action) => {
                state.loading = false
                state.value = action.payload
            })
    }
})

export const userChatsSelector = (state) => {
    return state.userChats
}

export default ChatListSlice.reducer