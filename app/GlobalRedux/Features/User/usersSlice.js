'use client'

const { createSlice } = require('@reduxjs/toolkit')

export const initialState = {
	uid: null,
	displayName: null,
	email: null,
	photoURL: null,
}

export const userSlice = createSlice({
	name: 'user',

	initialState,

	reducers: {
		setUser: (state, action) => {
			state.uid = action.payload.uid
			state.displayName = action.payload.displayName
			state.email = action.payload.email
			state.photoURL = action.payload.image
		},

		removeUser: (state) => {
			state.uid = null
			state.displayName = null
			state.email = null
			state.photoURL = null
		},
	},
})

export const { setUser, removeUser} = userSlice.actions

export function userSelector(state) {
    return state.user
}

export default userSlice.reducer
