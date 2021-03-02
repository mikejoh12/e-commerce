import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import productsReducer from '../features/products/productsSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer
  },
});