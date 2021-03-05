import CartProduct from './CartProduct'
import { useSelector } from 'react-redux'
import { selectCart } from '../features/cart/cartSlice'
import { Link } from 'react-router-dom'

const Cart = () => {

  const cartContents = useSelector(selectCart)

    return (
        <div className="flex-grow p-5">
          <div className="grid justify-center">
              {Object.keys(cartContents).map(keyName =>
                  <CartProduct  key={cartContents[keyName].product.id}
                                cartItem={cartContents[keyName]} />
                                )}
          <div>
            <div>
              <Link to="/checkout">
                <button className="m-4 mt-4 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Go to Checkout
                </button>   
              </Link>
              </div>
            </div>     
          </div>

        </div>
      )
    }
    
export default Cart