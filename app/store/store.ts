import { configureStore } from "@reduxjs/toolkit";
import wishListReducer from "./wishlist";
import searchCoinReducer from "./searchCoin";

const store = configureStore({
    reducer: {
        wishList: wishListReducer,
        searchCoin: searchCoinReducer
    }
})

export default store
