import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const axios = require('axios')

export const fetchCurrentCart = createAsyncThunk('cart/fetchCurrentCart', async () => {
    try {
        const response = await axios.get('/api/carts/self')
        const cart = {}
        response.data.forEach(cartProduct =>
            cart[cartProduct.product.id] = cartProduct)
        return cart
    } catch (error) {
        console.log(error)
    }
})

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: {}
    },
    //Clear cart when logging out
    reducers: {
        cartProductsUpdated(state, action) {
            state.cartProducts = action.payload
        }
    },    
    extraReducers: {
        //Reducers for fetching cart
        [fetchCurrentCart.pending]: (state, action) => {
            state.cartProductsStatus = 'loading'
          },
          [fetchCurrentCart.fulfilled]: (state, action) => {
            state.cartProductsStatus = 'succeeded'
            state.cartProducts = action.payload
          },
          [fetchCurrentCart.rejected]: (state, action) => {
            state.cartProductsStatus = 'failed'
          },
    }
})

export const    { cartProductsUpdated } = cartSlice.actions

export const selectCart = state => state.cart.cartProducts

export default cartSlice.reducer