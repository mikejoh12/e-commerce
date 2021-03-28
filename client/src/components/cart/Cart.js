import CartProduct from './CartProduct'
import { useSelector } from 'react-redux'
import { selectCart } from '../../features/cart/cartSlice'
import { selectAllProducts } from '../../features/products/productsSlice'
import { Link } from 'react-router-dom'

const Cart = () => {

  const cartContents = useSelector(selectCart)
  const products = useSelector(selectAllProducts)

  const totalPrice = Object.keys(cartContents).reduce((acc, keyName) => 
    acc + parseFloat(products[keyName].price) * parseInt(cartContents[keyName].quantity, 10), 0)

    return (
        <div className="flex-grow p-5">
          <div className="grid justify-center">
              {Object.keys(cartContents).map(keyName =>
                  <CartProduct  key={keyName}
                                cartItem={products[keyName]}
                                quantity={cartContents[keyName].quantity}/>
                                )}
          <div>
          { (totalPrice > 0) &&
          <div>
              <p className="font-bold text-center text-xl mb-2 text-gray-700 text-base">
                Total price: ${totalPrice}
              </p>
          </div>
          }
          <div>
            { (Object.keys(cartContents).length) ?
            <div className="flex justify-center">
            <Link to="/checkout">
              <button className="m-4 mt-4 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Go to Checkout
              </button>   
            </Link>
            </div>
            :
            <div>
                <p className="font-bold text-xl mb-2 text-gray-700 text-base">
                  The cart is empty.
                </p>
            </div>
            }
            </div>
            </div>     
          </div>

        </div>
      )
    }
    
export default Cart