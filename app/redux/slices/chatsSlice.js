import { firestore } from "@/app/firebase"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, getDocs, query, where } from "firebase/firestore"

export const initialState = {
    data: {},
    loading: false
}

export const getChatsForUserAsync = createAsyncThunk(
    'get/user/chats',
    async (uid) => {
        try {
            const q = query(collection(firestore, 'chats'), where('participants', 'array-contains', uid))
            const querySnapshot = await getDocs(q)
            let userChats = [];
            let result = {}
            querySnapshot.forEach(chat => userChats.push(chat.data()))
            userChats.forEach((chat) => {
                result[chat.chatId] = chat
            })
            return result
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const chatsSlice = createSlice({
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
                state.data = action.payload
            })
    }
})

export const chatsSelector = (state) => {
    return state.chats
}

export default chatsSlice.reducer