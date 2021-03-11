import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const axios = require('axios')

export const fetchCurrentCart = createAsyncThunk('cart/fetchCurrentCart', async () => {
        const response = await axios.get('/api/carts/self')
        const cart = {}
        response.data.forEach(cartProduct =>
            cart[cartProduct.product.id] = {
                quantity: cartProduct.quantity
            })
        return cart
})

export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async cartProduct => {
        try {
            await axios.post('/api/carts/self/product',
                cartProduct)
            return cartProduct
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeProductFromCart = createAsyncThunk(
    'cart/removeProductFromCart',
    async product => {
        try {
            await axios.delete('/api/carts/self/product',
                {data: product})
            return product
        } catch (error) {
            console.log(error)
        }
    }
)

export const changeProductQuantity = createAsyncThunk(
    'cart/changeProductQuantity',
    async product => {
        try {
            await axios.put('/api/carts/self/product',
            product)
            return product
        } catch (error) {
            console.log(error)
        }
    }
)

export const checkoutCart = createAsyncThunk(
    'cart/checkoutCart', async () => {
        try {
            const response = await axios.post('/api/carts/self/checkout')
            return response.data
        } catch(error) {
            console.log(error)
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProductsStatus: 'idle',
        cartProducts: {},
        checkoutCartStatus: 'idle'
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
        //Reducer for adding product to cart
        [addProductToCart.fulfilled]: (state, action) => {
            state.cartProducts[action.payload.product_id] = action.payload
        },
        //Reducer for removing product from cart
        [removeProductFromCart.fulfilled]: (state, action) => {
            delete state.cartProducts[action.payload.product_id]
        },
        //Reducer for changing qty of a product in cart
        [changeProductQuantity.fulfilled]: (state, action) => {
            state.cartProducts[action.payload.product_id].quantity = action.payload.quantity
        },
        //Reducers for tracking status of order placement
        [checkoutCart.pending]: (state, action) => {
            state.checkoutCartStatus = 'loading'
        },
        [checkoutCart.fulfilled]: (state, action) => {
            state.checkoutCartStatus = 'succeeded'
        },
        [checkoutCart.rejected]: (state, action) => {
            state.checkoutCartStatus = 'failed'
        },
    }
})

export const    { cartProductsUpdated } = cartSlice.actions
export const selectCart = state => state.cart.cartProducts
export default cartSlice.reducer