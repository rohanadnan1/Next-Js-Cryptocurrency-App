import { createSlice } from "@reduxjs/toolkit";

const searchCoin = createSlice({
    name: "searchCoin",
    initialState: {
        searchCoin: ""
    },
    reducers: {
        setSearchCoin: (state, action) => {
            state.searchCoin = action.payload
        }
    }
})

export const { setSearchCoin } = searchCoin.actions
export default searchCoin.reducer