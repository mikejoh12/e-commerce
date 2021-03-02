import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'

const Register = () => {
      const { register, handleSubmit, errors } = useForm();
      
      const onSubmit = data => console.log(data);

      return (
        <div className="flex-grow p-10 mx-auto">    
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="p-2">
              <label htmlFor="email" className="block text-md font-medium text-gray-700">Email:</label>
              <input name="email" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
              {errors.email && <span>This field is required</span>}
            </div>

            <div className="p-2">
              <label htmlFor="password">Password:</label>
              <input name="password" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
              {errors.password && <span>This field is required</span>}
            </div>

            <div className="p-2">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input name="confirmPassword" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
              {errors.confirmPassword && <span>This field is required</span>}
            </div>

            <div className="p-2">
              <label htmlFor="firstName">First Name:</label>
              <input name="firstName" label="Name:" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} /> 
              {errors.firstName && <span>This field is required</span>}
            </div>       
            
            <div className="p-2">
              <label htmlFor="lastName">Last Name:</label>
              <input name="lastName" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
              {errors.lastName && <span>This field is required</span>}
            </div>

            <div className="p-2">
              <label htmlFor="address1">Address Line 1:</label>
              <input name="address1" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
              {errors.address1 && <span>This field is required</span>}
            </div>

            <div className="p-2">
              <label htmlFor="address2">Address Line 2:</label>
              <input name="address2" className="border rounded w-full p-1 border-blue-300" ref={register()} />
            </div>

            <div className="p-2">
              <label htmlFor="postcode">Zip Code:</label>
              <input name="postcode" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />    
              {errors.postcode && <span>This field is required</span>}
            </div>    
            
            <div className="p-2">
              <label htmlFor="city">City:</label>
              <input name="city" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
              {errors.city && <span>This field is required</span>}
            </div>

            <div className="p-2">
              <label htmlFor="country">Country:</label>
              <input name="country" className="border rounded w-full p-1 border-blue-300" ref={register()} />
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
      </div>
      )
    }
    
export default Register