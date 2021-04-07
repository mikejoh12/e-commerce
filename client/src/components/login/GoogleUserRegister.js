import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, fetchCurrentUser, selectCurrentUserStatus } from '../../features/users/usersSlice'
import { selectNeedsCheckoutRedirect, needsCheckoutRedirectUpdated } from '../../features/cart/cartSlice'
import apiAxios from '../../config/axiosConfig'

const GoogleUserRegister = () => {
      const { register, handleSubmit, formState } = useForm();
      const history = useHistory()
      const dispatch = useDispatch()
      const user = useSelector(selectCurrentUser)
      const userStatus = useSelector(selectCurrentUserStatus)   
      const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect)
      const [isUserUpdated, setIsUserUpdated] = useState(false)

      const handleUpdateUser = async data => {
        try {
          await apiAxios.put(
            '/users/self',
              {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                address1: data.address1,
                address2: data.address2,
                postcode: data.postcode,
                city: data.city,
                country: data.country
              })
            dispatch(fetchCurrentUser())
            setIsUserUpdated(true)
        } catch (err) {
          if (err) {
          console.log(err)
        }}
      }

      //When user info is updated, redirect to main site or checkout
      useEffect(() => {
        if (  userStatus === 'succeeded' &&
              isUserUpdated) {
            //Check if we need to redirect back to checkout process
            if (needsCheckoutRedirect) {
              dispatch(needsCheckoutRedirectUpdated(false))
              history.push('/checkout')
            } else {
              history.push('/')
            }
      }}, [userStatus, dispatch, history, needsCheckoutRedirect, isUserUpdated])

      return (
        <div className="p-10 mx-auto">    
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            
            <div className="p-2">
              <p  className="w-full p-1">
                Google Email: {user.email}
              </p>
            </div>
            
            <div className="p-2">
              <p  className="w-full p-1">
                Name: {user.first_name} {user.last_name}
              </p>
            </div>

            <div className="p-2">
              <p  className="w-full p-1">
                Please enter contact info below:
              </p>
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
              <input type="submit" value="Enter contact info" className="my-2 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"/>
            </div>
            <div>
          </div>
        </form>
      </div>
      )
    }
    
export default GoogleUserRegister