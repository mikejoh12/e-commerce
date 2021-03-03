import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        customerOrders: [
            {
                order_id: 1,
                id: 1,
                name: 'MacBook Pro',
                price: 1899.00,
                quantity: 1,
                user_id: 6,
            }
        ]
    }
})