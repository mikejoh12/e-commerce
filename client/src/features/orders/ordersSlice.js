import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios')

export const fetchCustomerOrders = createAsyncThunk('orders/fetchCustomerOrders', async () => {
    try {
        const response = await axios.get('/api/orders/self')
        const orders = {}
        response.data.forEach(orderProduct => {
            if (!orders[orderProduct.order_id]) {
                orders[orderProduct.order_id] = []
            }
            orders[orderProduct.order_id].push(orderProduct)
        })
        console.log(orders)
        return orders
    } catch (error) {
        console.log(error)
    }
})

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        customerOrders: {}
        /* [
            {
                order_id: 1,
                product_id: 1,
                name: 'Apple MacBook Pro',
                price: 1899.00,
                quantity: 1,
                user_id: 6,
                created_at: '2021-02-22T15:07:13.042Z'
            }
        ] */
    },
    extraReducers: {
        //Reducers for fetching orders
        [fetchCustomerOrders.pending]: (state, action) => {
            state.customerOrdersStatus = 'loading'
          },
          [fetchCustomerOrders.fulfilled]: (state, action) => {
            state.customerOrdersStatus = 'succeeded'
            state.customerOrders = action.payload
          },
          [fetchCustomerOrders.rejected]: (state, action) => {
            state.customerOrdersStatus = 'failed'
          },
    }
})

export const selectCustomerOrders = state => state.orders.customerOrders
export default ordersSlice.reducer