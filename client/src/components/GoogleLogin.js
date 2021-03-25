import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchCurrentUser, isLoggedInUpdated } from '../features/users/usersSlice'
import { fetchCurrentCart } from "../features/cart/cartSlice"
import { fetchCustomerOrders } from "../features/orders/ordersSlice"
import { useEffect } from 'react'

const GoogleLogin = () => {
      const dispatch = useDispatch()
      const history = useHistory()

      useEffect(() => {
              dispatch(isLoggedInUpdated(true))
              dispatch(fetchCurrentUser())
              dispatch(fetchCurrentCart())
              dispatch(fetchCustomerOrders())
              history.push('/')
            }, [dispatch, history])
      

      return (
        <div className="flex-grow pt-16 mx-auto">    
        </div>
      )
    }
    
export default GoogleLogin