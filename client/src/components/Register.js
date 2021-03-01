import { useForm } from "react-hook-form"

const Register = () => {
      const { register, handleSubmit, errors } = useForm();
      
      const onSubmit = data => console.log(data);

      return (
        <div className="flex-grow p-10 mx-auto">    
          <form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <label htmlFor="email" className="block text-md font-medium text-gray-700">Email:</label>
              <input name="email" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input name="password" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input name="confirmPassword" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
            </div>

            <div>
              <label htmlFor="firstName">First Name:</label>
              <input name="firstName" label="Name:" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} /> 
            </div>       
            
            <div>
              <label htmlFor="firstName">Last Name:</label>
              <input name="lastName" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
            </div>

            <div>
              <label htmlFor="address1">Address Line 1:</label>
              <input name="address1" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
            </div>

            <div>
              <label htmlFor="address2">Address Line 2:</label>
              <input name="address2" className="border rounded w-full p-1 border-blue-300" ref={register()} />
            </div>

            <div>
              <label htmlFor="postcode">Zip Code:</label>
              <input name="postcode" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />    
            </div>    
            
            <div>
              <label htmlFor="city">City:</label>
              <input name="city" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
            </div>

            <div>
              <label htmlFor="country">Country:</label>
              <input name="country" className="border rounded w-full p-1 border-blue-300" ref={register()} />
            </div>

            {errors.exampleRequired && <span>This field is required</span>}
            
            <div>
              <input type="submit" className="my-2 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"/>
            </div>
          </form>
        </div>
      )
    }
    
export default Register