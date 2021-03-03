import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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
            },
            {
                product:    {
                        id: 2,
                        name: "Ipad",
                        price: 799.00,
                        description: "A nice toy",
                        category: "Computers",
                        image_url: "https://cdn.pocket-lint.com/r/s/970x/assets/images/153809-tablets-news-apple-ipad-air-gets-a-pro-like-update-a14-chip-launches-alongside-ipad-8th-gen-image7-jypias54uz-jpg.webp?v1",
                        status: "Active"
                },
                quantity: 2
            }
        ]
    }
})

export const selectCart = state => state.cart.cartProducts

export default cartSlice.reducer