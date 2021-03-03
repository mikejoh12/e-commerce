import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: [
            {
                product:    {
                        id: 1,
                        name: "MacBook Pro",
                        price: 1899.00,
                        description: "A great computer for coding.",
                        category: "Computers",
                        image_url: "https://cdn.pocket-lint.com/r/s/970x/assets/images/152137-laptops-review-apple-macbook-pro-2020-review-image1-pbzm4ejvvs-jpg.webp",
                        status: "Active"
                },
                quantity: 1
            }
        ]
    }
})