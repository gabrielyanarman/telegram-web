'use client'

const { createSlice } = require('@reduxjs/toolkit')

export const initialState = {
	uid: null,
	displayName: null,
	email: null,
	photoURL: null,
}

export const selectedUserSlice = createSlice({
	name: 'selectedUser',

	initialState,

	reducers: {
		setSelectedUser: (state, action) => {
			state.uid = action.payload.uid
			state.displayName = action.payload.displayName
			state.email = action.payload.email
			state.photoURL = action.payload.image
		},

		removeSelectedUser: (state) => {
			state.uid = null
			state.displayName = null
			state.email = null
			state.photoURL = null
		},
	},
})

export const { setSelectedUser, removeSelectedUser} = selectedUserSlice.actions

export function selectedUserSelector(state) {
    return state.selectedUser
}

export default selectedUserSlice.reducer
