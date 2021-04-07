import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchCurrentUser, isLoggedInUpdated, selectNeedsCheckoutRedirect, needsCheckoutRedirectUpdated } from '../../features/users/usersSlice'
import { selectCart, fetchCurrentCart } from "../../features/cart/cartSlice"
import { useSelector } from 'react-redux'
import { fetchCustomerOrders } from "../../features/orders/ordersSlice"
import { useEffect } from 'react'
import { selectCurrentUser, selectCurrentUserStatus } from '../../features/users/usersSlice'


const GoogleLogin = () => {
      const user = useSelector(selectCurrentUser)
      const userStatus = useSelector(selectCurrentUserStatus)
      const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect)
      const dispatch = useDispatch()
      const cartContents = useSelector(selectCart)
      const history = useHistory()

      //Get user data to redux store after signing in with Google
      useEffect(() => {
        if (userStatus === 'idle') {
          dispatch(isLoggedInUpdated(true))
          dispatch(fetchCurrentUser())
          dispatch(fetchCurrentCart(cartContents))
          dispatch(fetchCustomerOrders())          
        }
      }, [userStatus, dispatch, history, cartContents])
      
      //Ask for address if not in the database, otherwise redirect to main site
      useEffect(() => {
        if (userStatus === 'succeeded') {
          if (user.address1) {
            //Check if we need to redirect back to checkout process
            if (needsCheckoutRedirect) {
              dispatch(needsCheckoutRedirectUpdated(false))
              console.log('Redirecting to checkout')
              history.push('/checkout')
            } else {
              console.log('value:', needsCheckoutRedirect)
              history.push('/')
            }
          } else {
            history.push('/google-login/user-register')
          }
        }
      }, [userStatus, user.address1, dispatch, history, needsCheckoutRedirect])

      return (
        <div>   
        </div>
      )
    }
    
export default GoogleLogin