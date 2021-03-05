import { createSlice } from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        customerOrders: [
            {
                order_id: 1,
                product_id: 1,
                name: 'Apple MacBook Pro',
                price: 1899.00,
                quantity: 1,
                user_id: 6,
                created_at: '2021-02-22T15:07:13.042Z'
            }
        ]
    }
})

export const selectCustomerOrders = state => state.orders.customerOrders
export default ordersSlice.reducer