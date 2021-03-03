import { configureStore, createReducer } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import productsReducer from '../features/products/productsSlice'
import ordersReducer from './features/orders/ordersSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    orders: ordersReducer,
    cart: createReducer
  },
});