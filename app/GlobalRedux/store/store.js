'use client'

import selectedUserReducer from '../Features/selectedUser/selectedUserSlice'
import AllUsersReducer from '../Features/AllUsers/AllUsersSlice'
import UserChatsReducer from '../Features/UserChats/ChatListSlice'
import LeftSearchReducer from '../Features/LeftColumnSearch/SearchSlice'

const { configureStore } = require('@reduxjs/toolkit')

export const store = configureStore({
	reducer: {
		selectedUser: selectedUserReducer,
		allUsers: AllUsersReducer,
		userChats: UserChatsReducer,
		leftSearch: LeftSearchReducer,
	},
})
