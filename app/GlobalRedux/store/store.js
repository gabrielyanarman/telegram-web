'use client'

import userReducer from '../Features/User/usersSlice'
const { configureStore } = require('@reduxjs/toolkit')

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
})
