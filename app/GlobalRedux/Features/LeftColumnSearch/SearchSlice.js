import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    value: ''
}

export const SearchSlice = createSlice({
    name: 'leftColumnSearch',
    initialState,
    reducers: {
        changeSearchValue: (state,action) => {
            state.value = action.payload
        }
    }
})

export const {changeSearchValue} = SearchSlice.actions

export const searchValueSelector = (state) => {
    return state.leftSearch
}

export default SearchSlice.reducer