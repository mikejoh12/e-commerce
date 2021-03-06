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
        return orders
    } catch (error) {
        console.log(error)
    }
})

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        customerOrders: {}
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