import CartProduct from './CartProduct'
import { useSelector, useDispatch } from 'react-redux'
import { selectCart,  needsCheckoutRedirectUpdated } from '../../features/cart/cartSlice'
import { selectAllProducts } from '../../features/products/productsSlice'
import { useHistory } from 'react-router-dom'

const Cart = () => {

  const cartContents = useSelector(selectCart)
  const products = useSelector(selectAllProducts)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleCheckout = () => {
    dispatch(needsCheckoutRedirectUpdated(true))
    history.push('/checkout')
  }

  const totalPrice = Object.keys(cartContents).reduce((acc, keyName) => 
    acc + parseFloat(products[keyName].price) * parseInt(cartContents[keyName].quantity, 10), 0)

    return (
        <div className="mt-10">
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
              <button className="m-4 mt-4 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handleCheckout}>
                    Go to Checkout
              </button>   
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