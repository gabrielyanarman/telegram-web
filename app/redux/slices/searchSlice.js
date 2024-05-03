import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    value: ''
}

export const searchSlice = createSlice({
    name: 'leftColumnSearch',
    initialState,
    reducers: {
        changeSearchValue: (state,action) => {
            state.value = action.payload
        }
    }
})

export const {changeSearchValue} = searchSlice.actions

export const searchValueSelector = (state) => {
    return state.leftSearch
}

export default searchSlice.reducer