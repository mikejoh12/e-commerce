import CartProduct from './CartProduct'
import { useSelector, useDispatch } from 'react-redux'
import { selectCart, checkoutCart, cartProductsUpdated } from '../features/cart/cartSlice'
import { selectAllProducts } from '../features/products/productsSlice'
import { fetchCustomerOrders } from '../features/orders/ordersSlice'
import { useHistory } from 'react-router-dom'

import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'

const CheckOut = () => {
  
  const cartContents = useSelector(selectCart)
  const products = useSelector(selectAllProducts)
  const dispatch = useDispatch()
  const history = useHistory()

  const stripe = useStripe()
  const elements = useElements()

  const totalPrice = Object.keys(cartContents).reduce((acc, keyName) => 
    acc + parseFloat(products[keyName].price) * parseInt(cartContents[keyName].quantity, 10), 0)

  //Stripe payment
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };


  const handlePlaceOrder = async() => {
      try {
        const orderResponse = await dispatch(checkoutCart())
        await dispatch(fetchCustomerOrders()) //Fetch order state after new order placed
        await dispatch(cartProductsUpdated({})) //Clear cart
        const orderId = orderResponse.payload.order_id
        history.push(`/checkout-done/${orderId}`)
      } catch(error) {
        console.log(error)
      }
}

    return (
        <div className="flex-grow p-5">
          <div className="grid justify-center">
            {Object.keys(cartContents).map(keyName =>
                    <CartProduct  key={keyName}
                                  cartItem={products[keyName]}
                                  quantity={cartContents[keyName].quantity}/>
                                  )}
            <div>
            <div>
              { (totalPrice > 0) &&
                <p className="font-bold text-center text-xl mb-2 text-gray-700 text-base">
                  Total price: ${totalPrice}
                </p>
              }
            </div>

            <form onSubmit={handleSubmit}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
              <button type="submit" disabled={!stripe}>
                Pay
              </button>
            </form>

            <div>
              <button
                  className="m-4 mt-4 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handlePlaceOrder}>
                  Place Order
              </button>  
            </div>
            </div>     
          </div>
        </div>
      )
    }
    
export default CheckOut