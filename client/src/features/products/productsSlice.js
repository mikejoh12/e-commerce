import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        allProducts: [
            {
                id: 1,
                name: 'MacBook Pro',
                price: 1899.00,
                description: 'A very powerful Mac with M5 chip.',
                category: 'Computers',
                image_url: 'https://cdn.pocket-lint.com/r/s/970x/assets/images/152137-laptops-review-apple-macbook-pro-2020-review-image1-pbzm4ejvvs-jpg.webp',
                status: 'Active'
            },
            {
                id: 1,
                name: 'MacBook Pro',
                price: 1899.00,
                description: 'A very powerful Mac with M5 chip.',
                category: 'Computers',
                image_url: 'https://cdn.pocket-lint.com/r/s/970x/assets/images/152137-laptops-review-apple-macbook-pro-2020-review-image1-pbzm4ejvvs-jpg.webp',
                status: 'Active'
            },
            {
                id: 1,
                name: 'MacBook Pro',
                price: 1899.00,
                description: 'A very powerful Mac with M5 chip.',
                category: 'Computers',
                image_url: 'https://cdn.pocket-lint.com/r/s/970x/assets/images/152137-laptops-review-apple-macbook-pro-2020-review-image1-pbzm4ejvvs-jpg.webp',
                status: 'Active'
            }
        ]
    }
})

export const selectProducts = state => state.products.allProducts

export default productsSlice.reducer