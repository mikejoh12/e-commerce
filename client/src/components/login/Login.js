import { useForm } from "react-hook-form"
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser,  isLoggedInUpdated } from '../../features/users/usersSlice'
import { selectCart, fetchCurrentCart,  selectNeedsCheckoutRedirect, needsCheckoutRedirectUpdated } from "../../features/cart/cartSlice"
import { fetchCustomerOrders } from "../../features/orders/ordersSlice"
import { useState } from 'react'
import apiAxios from '../../config/axiosConfig'

const Login = () => {
      const { register, handleSubmit, formState } = useForm();
      const dispatch = useDispatch()
      const history = useHistory()
      const [loginMsg, setLoginMsg] = useState('')
      const cartContents = useSelector(selectCart)
      const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect)

      const handleLogin = async data => {
        try {
          const response = await apiAxios.post(
            '/auth/login',
              {
                email: data.email,
                password: data.password
              },
              {withCredentials: true})
          if (response.status === 200) {
            dispatch(isLoggedInUpdated(true))
            dispatch(fetchCurrentUser())
            dispatch(fetchCurrentCart(cartContents))
            dispatch(fetchCustomerOrders())
            if (needsCheckoutRedirect) {
              dispatch(needsCheckoutRedirectUpdated(false))
              history.push('/checkout')
            } else {
              history.push('/')
            }
          }
        } catch (error) {
          const errorMsg = error.response.data.error ? error.response.data.error.message : 'An error occurred.'
          setLoginMsg(errorMsg)
        }
      }

      return (
        <div className="pt-16 mx-auto max-w-md px-4">    
          <form onSubmit={handleSubmit(handleLogin)}>

            {needsCheckoutRedirect &&
            <p className="m-4 text-gray-700 text-lg text-base text-center"
              >Please log in or create an account to continue checking out.
            </p>
            }

            <div className="p-2">
              <label htmlFor="email" className="block text-md font-medium text-gray-700">Email:</label>
              <input  name="email" className="border rounded w-full p-1 border-blue-300" 
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        }
                      })} />
              {formState.errors.email?.type === 'required' && 'Email is required.'}
              {formState.errors.email?.type === 'pattern' && 'Enter a valid email address.'}
            </div>

            <div className="p-2">
              <label htmlFor="password">Password:</label>
              <input  name="password" type="password" className="border rounded w-full p-1 border-blue-300"
                      ref={register({ required: true })} />
              {formState.errors.password?.type === 'required' && 'Password is required.'}
            </div>
            
            <div className="p-2">
                <input  type="submit"
                        value="Login"
                        className="mr-2 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"/>
                
                <Link to="/register">
                    <button className="m-2 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Create new account
                    </button>
                </Link>
            </div>
          </form>

          <a href="/api/auth/google">
            <button  className="m-2 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Login with Google
            </button>
          </a>

          <p className="text-gray-700 font-medium text-base text-center">
            {loginMsg}
          </p>

        </div>
      )
    }
    
export default Login