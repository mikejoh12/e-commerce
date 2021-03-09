import CartProduct from './CartProduct'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCart, checkoutCart, cartProductsUpdated } from '../features/cart/cartSlice'
import { selectAllProducts } from '../features/products/productsSlice'
import { fetchCustomerOrders } from '../features/orders/ordersSlice'
import { useHistory } from 'react-router-dom'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
const axios = require('axios')

const CheckOut = () => {
  
  const cartContents = useSelector(selectCart)
  const products = useSelector(selectAllProducts)
  const dispatch = useDispatch()
  const history = useHistory()

  //Stripe payment state
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
      const fetchData = async() => {
      try {
        const response = await axios.post(
          '/api/payment/create-payment-intent',
          {items: [{ id: "xl-tshirt" }]})
          setClientSecret(response.data.clientSecret)
      } catch (error) {
        console.log(error)
      }}
      fetchData()
  }, [])

  // Stripe styling
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "")
  }

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  }

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

  //Add up price of items in cart
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
            <div>
              { (totalPrice > 0) &&
                <p className="font-bold text-center text-xl mb-2 text-gray-700 text-base">
                  Total price: ${totalPrice}
                </p>
              }
            </div>

            <form id="payment-form" onSubmit={handleSubmit}>
              <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
              <button
                disabled={processing || disabled || succeeded}
                id="submit"
              >
                <span id="button-text">
                  {processing ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {/* Show any error that happens when processing the payment */}
              {error && (
                <div className="card-error" role="alert">
                  {error}
                </div>
              )}
              {/* Show a success message upon completion */}
              <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment succeeded, see the result in your
                <a
                  href={`https://dashboard.stripe.com/test/payments`}
                >
                  {" "}
                  Stripe dashboard.
                </a> Refresh the page to pay again.
              </p>
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