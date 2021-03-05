import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../features/users/usersSlice'
import { useDispatch } from 'react-redux'
import { isLoggedInUpdated, currentUserUpdated } from '../features/users/usersSlice'

function Nav() {

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch(isLoggedInUpdated)

    const handleLogout = () => {
      dispatch(isLoggedInUpdated(false))
      dispatch(currentUserUpdated({})) //Clear current user info from session
    }

    return (
      <div className="bg-black">
        <div className="max-w-7xl mx-auto flex flex-row justify-around items-center p-5">
              <Link to="/">
                <p className="text-4xl text-white text-center font-mono whitespace-nowrap mx-2">E-Market</p>
              </Link>
              <p className="hidden sm:inline text-md text-white text-center font-mono mx-2">A demo e-commerce app</p>
              <Link to="/cart">
                <span className="inline">
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" inverse/>
                  <p className="inline text-md text-white text-center font-mono mx-2">Cart</p>
                </span>
              </Link>
              {isLoggedIn ?
              <div>
                <Link to="/account">
                  <button   className="text-md text-white text-center font-mono mx-4"
                            >User Account</button>
                </Link>
                <Link to="/">
                <button   className="text-md text-white text-center font-mono mx-2"
                          onClick={handleLogout}>Sign Out</button>
                </Link>
              </div>
              :
              <Link to="/login">
                <button className="text-md text-white text-center font-mono mx-4">Sign In / Register</button>
              </Link>
              }           
        </div>
      </div>
    )
  }
  
  export default Nav