import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'

const Login = () => {
      const { register, handleSubmit, errors } = useForm();
      
      const onSubmit = data => console.log(data);

      return (
        <div className="flex-grow pt-16 mx-auto">    
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="p-2">
              <label htmlFor="email" className="block text-md font-medium text-gray-700">Email:</label>
              <input name="email" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
              {errors.email && <span>This field is required</span>}
            </div>

            <div className="p-2">
              <label htmlFor="password">Password:</label>
              <input name="password" type="password" className="border rounded w-full p-1 border-blue-300" ref={register({ required: true })} />
              {errors.password && <span>This field is required</span>}
            </div>

            {errors.exampleRequired && <span>This field is required</span>}
            
            <div className="p-2">
                <input type="submit" value="Login" className="mr-2 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"/>
                <Link to="/register">
                    <button className="m-2 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Create new account
                    </button>
                </Link>
            </div>
          </form>
        </div>
      )
    }
    
export default Login