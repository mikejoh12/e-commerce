import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchCurrentUser, isLoggedInUpdated } from '../../features/users/usersSlice'
import { fetchCurrentCart } from "../../features/cart/cartSlice"
import { useSelector } from 'react-redux'
import { fetchCustomerOrders } from "../../features/orders/ordersSlice"
import { useEffect } from 'react'
import { selectCurrentUser, selectCurrentUserStatus } from '../../features/users/usersSlice'


const GoogleLogin = () => {
      const user = useSelector(selectCurrentUser)
      const userStatus = useSelector(selectCurrentUserStatus)
      const dispatch = useDispatch()
      const history = useHistory()

      //Get user data to redux store after signing in with Google
      useEffect(() => {
        if (userStatus === 'idle') {
          dispatch(isLoggedInUpdated(true))
          dispatch(fetchCurrentUser())
          dispatch(fetchCurrentCart())
          dispatch(fetchCustomerOrders())          
        }
      }, [userStatus, dispatch, history])
      
      //Ask for address if not in the database, otherwise redirect to main site
      useEffect(() => {
        if (userStatus === 'succeeded') {
          if (user.address1) {
            history.push('/')
          } else {
            history.push('/google-login/user-register')
          }
        }
      }, [userStatus, user.address1, dispatch, history])

      return (
        <div>   
        </div>
      )
    }
    
export default GoogleLogin