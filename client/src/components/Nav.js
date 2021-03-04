import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../features/users/usersSlice'

function Nav() {

    const isLoggedIn = useSelector(selectIsLoggedIn)

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
              <Link to="/logout">
                <p className="text-md text-white text-center font-mono mx-2">Sign Out</p>
              </Link>
              :
              <Link to="/login">
                <p className="text-md text-white text-center font-mono mx-2">Sign In / Register</p>
              </Link>
              }           
        </div>
      </div>
    )
  }
  
  export default Nav