import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchCurrentUser, isLoggedInUpdated } from '../../features/users/usersSlice'
import { selectNeedsCheckoutRedirect, needsCheckoutRedirectUpdated, selectFetchCurrentCartStatus } from '../../features/cart/cartSlice'
import { selectCart, fetchCurrentCart } from "../../features/cart/cartSlice"
import { useSelector } from 'react-redux'
import { fetchCustomerOrders } from "../../features/orders/ordersSlice"
import { useEffect, useState } from 'react'
import { selectCurrentUser, selectCurrentUserStatus } from '../../features/users/usersSlice'
import { fetchAllProducts, selectFetchAllProductsStatus } from '../../features/products/productsSlice'
import { selectFetchCustomerOrdersStatus } from '../../features/orders/ordersSlice'

const GoogleLogin = () => {
      const user = useSelector(selectCurrentUser)
      const userStatus = useSelector(selectCurrentUserStatus)
      const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect)
      const dispatch = useDispatch()
      const cartContents = useSelector(selectCart)
      const history = useHistory()
      const fetchAllProductsStatus = useSelector(selectFetchAllProductsStatus)
      const fetchCurrentCartStatus = useSelector(selectFetchCurrentCartStatus)
      const fetchCustomerOrdersStatus = useSelector(selectFetchCustomerOrdersStatus)
      const [loginMsg, setLoginMsg] = useState('')

      //Get user data to redux store after signing in with Google
      useEffect(() => {
        if (userStatus === 'idle') {
          dispatch(fetchCurrentUser())
          dispatch(fetchCurrentCart(cartContents))
          dispatch(fetchCustomerOrders())
          dispatch(fetchAllProducts())    
        }
      }, [userStatus, dispatch, history, cartContents])
      
      useEffect(() => {
        if (  userStatus === 'failed') {
            setLoginMsg('An error occurred logging in using Google.')
        }
      }, [userStatus])

      //Ask for address if not in the database, otherwise redirect to main site
      useEffect(() => {
        if (  userStatus === 'succeeded' &&
              fetchAllProductsStatus === 'succeeded' &&
              fetchCurrentCartStatus === 'succeeded' &&
              fetchCustomerOrdersStatus === 'succeeded') {
            //Set log-in status
            dispatch(isLoggedInUpdated(true))
            if (user.address1) {
            //Check if we need to redirect back to checkout process
                if (needsCheckoutRedirect) {
                  dispatch(needsCheckoutRedirectUpdated(false))
                  history.push('/checkout')
                } else {
                  history.push('/')
                }
              } else {
                history.push('/google-login/user-register')
              }
            }
      }, [userStatus, user.address1, dispatch, history, needsCheckoutRedirect, fetchAllProductsStatus, fetchCurrentCartStatus, fetchCustomerOrdersStatus])

      return (
        <div>
          <p className="text-gray-700 font-medium text-base text-center">
            {loginMsg}
          </p>
        </div>
      )
    }
    
export default GoogleLogin