'use client'

import selectedUserReducer from '../Features/selectedUser/selectedUserSlice'
import AllUsersReducer from '../Features/AllUsers/AllUsersSlice'

const { configureStore } = require('@reduxjs/toolkit')

export const store = configureStore({
	reducer: {
		selectedUser: selectedUserReducer,
		allUsers: AllUsersReducer
	},
})
