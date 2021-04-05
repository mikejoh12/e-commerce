import { Link } from 'react-router-dom'
import { selectIsLoggedIn } from '../features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedInUpdated, currentUserUpdated } from '../features/users/usersSlice'
import { cartProductsUpdated, selectCart } from '../features/cart/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import apiAxios from './../config/axiosConfig'

function Nav() {

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()
    const cart = useSelector(selectCart)

    const nrCartItems = Object.keys(cart).reduce((acc, keyName) => 
    acc + cart[keyName].quantity, 0)

    const handleLogout = async() => {
      try {
        await dispatch(isLoggedInUpdated(false))
        await dispatch(currentUserUpdated({})) //Clear current user info from session
        await dispatch(cartProductsUpdated({})) //Clear cart
        await apiAxios.post('/auth/logout')
      } catch(err) {
        console.log(err)
      }
    }

    return (
      <div className="bg-black fixed w-full">
        <div className="max-w-7xl mx-auto flex flex-row justify-around items-center p-2">
              <div className="m-2">
                <Link to="/">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-blue-100 text-center font-mono whitespace-nowrap mx-2">E-Market</p>
                </Link>
              </div>

              <p className="hidden md:inline  max-w-md text-md lg:text-lg text-white text-center font-mono mx-2">A demo e-commerce app build with Postgres, Express, React and Node.js</p>
              
              <div className="m-2">
                <Link to="/cart">
                  <button className="py-4 px-1 relative border-2 border-transparent text-white rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <span className="absolute inset-0 object-right-top -mr-6">
                      <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                        {nrCartItems}
                      </div>
                    </span>
                  </button>
                </Link>
              </div>

              {isLoggedIn &&
              <div className="m-2">
                <Link to="/account">
                  <FontAwesomeIcon className="ml-4" icon={faUserCircle} size="lg" inverse/>
                  <button   className="hidden lg:inline text-md lg:text-lg text-white text-center font-mono ml-2"
                            >Account</button>
                </Link>
              </div>
              }
              {isLoggedIn ?
                <div className="m-2">
                  <Link to="/">
                  <button   className="text-md lg:text-lg text-white text-center font-mono mx-2"
                            onClick={handleLogout}>Sign Out</button>
                  </Link>
                </div>
              :
              <div className="m-2">
              <Link to="/login">
                <button className="text-md lg:text-lg text-white text-center font-mono mx-4">Sign In / Register</button>
              </Link>
              </div>
              }           
        </div>
      </div>
    )
  }
  
  export default Nav