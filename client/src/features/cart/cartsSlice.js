import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: [
            {
                product:    {

                },
                quantity: 
                
                "id": 1,
                "user_id": 6,
                "cart_id": 7,
                "product_id": 1,
                "quantity": 1,
                "name": "Apple Macbook Pro",
                "price": "1599.00",
                "description": "A great computer for coding",
                "category": "Electronics",
                "image_url": null,
                "status": "Active"
            }
        ]
    }
})