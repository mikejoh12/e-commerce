import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const axios = require('axios')

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
    try {
        const response = await axios.get('/api/products')
        const products = {}
        response.data.forEach(product =>
            products[product.id] = product)
        return products
    } catch (error) {
        console.log(error)
    }
})


export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        allProductsStatus: 'idle',
        allProducts: {}
    },
    extraReducers: {
        //Reducers for fetching products
        [fetchAllProducts.pending]: (state, action) => {
            state.allProductsStatus = 'loading'
          },
          [fetchAllProducts.fulfilled]: (state, action) => {
            state.allProductsStatus = 'succeeded'
            state.allProducts = action.payload
          },
          [fetchAllProducts.rejected]: (state, action) => {
            state.allProductsStatus = 'failed'
          },
    }
})

export const selectAllProducts = state => state.products.allProducts
export const selectProductById = (state, productId) => state.products.allProducts[productId]
export const selectAllProductsStatus = state => state.products.allProductsStatus

export default productsSlice.reducer