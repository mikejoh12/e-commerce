import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const axios = require('axios')

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
        const response = await axios.get('/api/products')
        const products = {}
        response.data.forEach(product =>
            products[product.id] = product)
        return products
})

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        fetchAllProductsStatus: 'idle',
        allProducts: {}
    },
    extraReducers: {
        //Reducers for fetching products
        [fetchAllProducts.pending]: (state, action) => {
            state.fetchAllProductsStatus = 'loading'
          },
          [fetchAllProducts.fulfilled]: (state, action) => {
            state.fetchAllProductsStatus = 'succeeded'
            state.allProducts = action.payload
          },
          [fetchAllProducts.rejected]: (state, action) => {
            state.fetchAllProductsStatus = 'failed'
          },
    }
})

export const selectAllProducts = state => state.products.allProducts
export const selectProductById = (state, productId) => state.products.allProducts[productId]
export const selectAllProductsStatus = state => state.products.allProductsStatus

export default productsSlice.reducer