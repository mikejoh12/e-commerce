import { useRef, useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCurrentUser, isLoggedInUpdated, selectCurrentUserStatus } from '../../features/users/usersSlice'
import { fetchCurrentCart, selectCart, selectNeedsCheckoutRedirect, selectFetchCurrentCartStatus, needsCheckoutRedirectUpdated } from "../../features/cart/cartSlice"
import { fetchCustomerOrders, selectFetchCustomerOrdersStatus } from "../../features/orders/ordersSlice"
import apiAxios from '../../config/axiosConfig'

const Register = () => {
      const { register, handleSubmit, formState, watch } = useForm();
      const history = useHistory()
      const dispatch = useDispatch()
      const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect)
      const cartContents = useSelector(selectCart)
      const password = useRef({})
      password.current = watch("password", "")
      const [errorMsg, setErrorMsg] = useState('')
      const [isLoginDone, setIsLoginDone] = useState(false)
      const fetchCurrentCartStatus = useSelector(selectFetchCurrentCartStatus)
      const fetchCustomerOrdersStatus = useSelector(selectFetchCustomerOrdersStatus)
      const userStatus = useSelector(selectCurrentUserStatus)
      const handleRegisterUser = async data => {
        try {
          await apiAxios.post(
            '/auth/signup',
              {
                email: data.email,
                password: data.password,
                first_name: data.firstName,
                last_name: data.lastName,
                address1: data.address1,
                address2: data.address2,
                postcode: data.postcode,
                city: data.city,
                country: data.country
              })
          const loginResponse = await apiAxios.post(
            '/auth/login',
              {
                email: data.email,
                password: data.password
              },
              {withCredentials: true})
          if (loginResponse.status === 200) {
            dispatch(isLoggedInUpdated(true))
            dispatch(fetchCurrentUser())
            dispatch(fetchCurrentCart(cartContents))
            dispatch(fetchCustomerOrders())
            setIsLoginDone(true)
          }
        } catch (err) {
          if (err.response) {
          console.log(err.response.data)
          setErrorMsg(err.response.data)
        } else if (err.request) {
          console.log(err.request.data)
        } else {
          console.log('An error occured creating account and/or logging in.')
        }
      }}

      //When login data is fetched, redirect to main site or checkout
      useEffect(() => {
        if (  userStatus === 'succeeded' &&
              fetchCurrentCartStatus === 'succeeded' &&
              fetchCustomerOrdersStatus === 'succeeded' &&
              isLoginDone) {
            //Check if we need to redirect back to checkout process
            if (needsCheckoutRedirect) {
              dispatch(needsCheckoutRedirectUpdated(false))
              history.push('/checkout')
            } else {
              history.push('/')
            }
      }}, [userStatus, dispatch, history, needsCheckoutRedirect, fetchCurrentCartStatus, fetchCustomerOrdersStatus, isLoginDone])

      return (
        <div className="p-10 mx-auto max-w-lg mx-4">    
          <form onSubmit={handleSubmit(handleRegisterUser)}>

            <div className="p-2">
              <label htmlFor="email" className="block text-md font-medium text-gray-700">Email:</label>
              <input  name="email" className="border rounded w-full p-1 border-blue-300" 
                      ref={register({
                        required: "Email is required",
                        maxLength: 100,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })} />
              {formState.errors.email && formState.errors.email.message}
              {formState.errors.email?.type === "maxLength" && 'Email can be max 100 characters long.'}
            </div>

            <div className="p-2">
              <label htmlFor="password">Password:</label>
              <input  name="password" className="border rounded w-full p-1 border-blue-300"
                      type="password"
                      ref={register({
                        required: true,
                        minLength: 6,
                        maxLength: 100
                        })} />
              {formState.errors.password?.type === 'required' && 'Password is required'}
              {formState.errors.password?.type === "minLength" && 'Password needs to be at least 6 characters long.'}
              {formState.errors.password?.type === "maxLength" && 'Password can be max 100 characters long.'}
            </div>

            <div className="p-2">
              <label htmlFor="repeatPassword">Repeat Password:</label>
              <input  name="repeatPassword" className="border rounded w-full p-1 border-blue-300"
                      type="password"
                      ref={register({
                          validate: value =>
                            value === password.current || 'The passwords do not match'
                          })} />
               {formState.errors.repeatPassword?.type === "validate" && 'Passwords do not match.'}
            </div>

            <div className="p-2">
              <label htmlFor="firstName">First Name:</label>
              <input  name="firstName" label="Name:" className="border rounded w-full p-1 border-blue-300" 
                      ref={register({
                        required: true,
                        maxLength: 100
                        })} />
              {formState.errors.firstName?.type === 'required' && 'First name is required'}
              {formState.errors.firstName?.type === "maxLength" && 'First name can be max 100 characters long.'}
            </div>       
            
            <div className="p-2">
              <label htmlFor="lastName">Last Name:</label>
              <input  name="lastName" className="border rounded w-full p-1 border-blue-300"
                      ref={register({
                        required: true,
                        maxLength: 100
                        })} />
              {formState.errors.lastName?.type === 'required' && 'Last name is required'}
              {formState.errors.lastName?.type === "maxLength" && 'Last name can be max 100 characters long.'}
            </div>

            <div className="p-2">
              <label htmlFor="address1">Address Line 1:</label>
              <input  name="address1" className="border rounded w-full p-1 border-blue-300"
                      ref={register({
                        required: true,
                        maxLength: 100
                        })} />
              {formState.errors.address1?.type === 'required' && 'Address is required'}
              {formState.errors.address1?.type === "maxLength" && 'Address can be max 100 characters long.'}
            </div>

            <div className="p-2">
              <label htmlFor="address2">Address Line 2:</label>
              <input  name="address2" className="border rounded w-full p-1 border-blue-300"
                      ref={register({
                        maxLength: 100
                      })} />
               {formState.errors.address2?.type === "maxLength" && 'Address can be max 100 characters long.'}
            </div>

            <div className="p-2">
              <label htmlFor="postcode">Zip Code:</label>
              <input  name="postcode" className="border rounded w-full p-1 border-blue-300"
                      ref={register({
                        required: true,
                        maxLength: 10
                        })} />
              {formState.errors.postcode?.type === 'required' && 'Postcode/zip is required.'}
              {formState.errors.postcode?.type === "maxLength" && 'Postcode/zip can be max 10 characters long.'}
            </div>    
            
            <div className="p-2">
              <label htmlFor="city">City:</label>
              <input  name="city" className="border rounded w-full p-1 border-blue-300"
                      ref={register({
                        required: true,
                        maxLength: 100})} />
              {formState.errors.city?.type === 'required' && 'City is required.'}
              {formState.errors.city?.type === "maxLength" && 'City can be max 100 characters long.'}
            </div>

            <div className="p-2">
              <label htmlFor="country">Country:</label>
              <input  name="country" className="border rounded w-full p-1 border-blue-300"
                      ref={register({
                        maxLength: 100
                      })} />
              {formState.errors.country?.type === "maxLength" && 'Country can be max 100 characters long.'}
            </div>

            <div className="p-2">
              <input type="submit" value="Create your account" className="my-2 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"/>
            </div>
            <div>
              <Link to="/login">
                <button className="wrap m-2 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Go to Sign-In page
                </button>
              </Link>
          </div>
        </form>
        <div className="p-2">
            <p className="text-gray-700 font-medium text-base text-center">
              {errorMsg}
            </p>
        </div>
      </div>
      )
    }
    
export default Register