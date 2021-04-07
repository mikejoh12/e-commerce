import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiAxios from '../../config/axiosConfig'

export const fetchCustomerOrders = createAsyncThunk('orders/fetchCustomerOrders', async () => {
        const response = await apiAxios.get('/orders/self')
        const orders = {}
        response.data.forEach(orderProduct => {
            if (!orders[orderProduct.order_id]) {
                orders[orderProduct.order_id] = {}
            }
            orders[orderProduct.order_id][orderProduct.product_id] = orderProduct
        })
        return orders
})

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        customerOrders: {},
        fetchCustomerOrdersStatus: 'idle'
    },
    //Clear cart when logging out
    reducers: {
      customerOrdersUpdated(state, action) {
          state.customerOrders = action.payload
      }
      },    
    extraReducers: {
        //Reducers for fetching orders
        [fetchCustomerOrders.pending]: (state, action) => {
            state.fetchCustomerOrdersStatus = 'loading'
          },
        [fetchCustomerOrders.fulfilled]: (state, action) => {
            state.fetchCustomerOrdersStatus = 'succeeded'
            state.customerOrders = action.payload
          },
        [fetchCustomerOrders.rejected]: (state, action) => {
            state.fetchCustomerOrdersStatus = 'failed'
          },
    }
})

export const { customerOrdersUpdated } = ordersSlice.actions
export const selectCustomerOrders = state => state.orders.customerOrders
export const selectOrderById = (state, orderId) => state.orders.customerOrders[orderId]
export const selectFetchCustomerOrdersStatus = state => state.orders.fetchCustomerOrdersStatus
export default ordersSlice.reducer