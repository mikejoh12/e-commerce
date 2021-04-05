import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiAxios from '../../config/axiosConfig'

export const fetchCurrentCart = createAsyncThunk('cart/fetchCurrentCart', async () => {
        const response = await apiAxios.get('/carts/self')
        const cart = {}
        response.data.forEach(cartProduct =>
            cart[cartProduct.product.id] = {
                quantity: cartProduct.quantity
            })
        return cart
})

export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async (cartProduct, {getState}) => {
        if (getState().users.isLoggedIn) {
        await apiAxios.post('/carts/self/product',
            cartProduct)
        }
        return cartProduct
    }
)

export const removeProductFromCart = createAsyncThunk(
    'cart/removeProductFromCart',
    async (product, {getState}) => {
            if (getState().users.isLoggedIn) {
                await apiAxios.delete('/carts/self/product',
                    {data: product})
            }
            return product
    }
)

export const changeProductQuantity = createAsyncThunk(
    'cart/changeProductQuantity',
    async (product, {getState}) => {
        if (getState().users.isLoggedIn) {
            await apiAxios.put('/carts/self/product',
                product)
        }
        return product
    }
)

export const checkoutCart = createAsyncThunk(
    'cart/checkoutCart', async () => {
            const response = await apiAxios.post('/carts/self/checkout')
            return response.data
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: {},
        fetchCurrentCartStatus: 'idle',
        addProductToCartStatus: 'idle',
        removeProductFromCartStatus: 'idle',
        changeProductQuantityStatus: 'idle',
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
        [addProductToCart.pending]: (state, action) => {
            state.addProductToCartStatus = 'loading'
        },
        [addProductToCart.fulfilled]: (state, action) => {
            state.addProductToCartStatus = 'succeeded'
            state.cartProducts[action.payload.product_id] = action.payload
        },
        [addProductToCart.rejected]: (state, action) => {
            state.addProductToCartStatus = 'failed'
        },
        //Reducer for removing product from cart
        [removeProductFromCart.pending]: (state, action) => {
            state.removeProductFromCartStatus = 'loading'
        },
        [removeProductFromCart.fulfilled]: (state, action) => {
            state.removeProductFromCartStatus = 'succeeded'
            delete state.cartProducts[action.payload.product_id]
        },
        [removeProductFromCart.rejected]: (state, action) => {
            state.removeProductFromCartStatus = 'failed'
        },
        //Reducer for changing qty of a product in cart
        [changeProductQuantity.pending]: (state, action) => {
            state.changeProductQuantityStatus = 'loading'
        },        
        [changeProductQuantity.fulfilled]: (state, action) => {
            state.changeProductQuantityStatus = 'succeeded'
            state.cartProducts[action.payload.product_id].quantity = action.payload.quantity
        },
        [changeProductQuantity.rejected]: (state, action) => {
            state.changeProductQuantityStatus = 'failed'
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