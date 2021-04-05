import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiAxios from '../../config/axiosConfig'

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
        const response = await apiAxios.get('/products')
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
export const selectFetchAllProductsStatus = state => state.products.fetchAllProductsStatus

export default productsSlice.reducer