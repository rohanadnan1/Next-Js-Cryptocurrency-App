import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WishItems {
    id: number
    name: string
    price: number
    image: string
}

const wishList = createSlice({
    name: 'wishList',
    initialState: [] as WishItems[],
    reducers: {
        addWishList: (state, action: PayloadAction<WishItems> ) => {
            if(state.findIndex((item) => item.id === action.payload.id) !== -1) return state
            state.push(action.payload)
        },
        removeWishList: (state, action) => {
            return state.filter((item) => item.id !== action.payload)
        }
    }
})

export const { addWishList, removeWishList } = wishList.actions
export default wishList.reducer