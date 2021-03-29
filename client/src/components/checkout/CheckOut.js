import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkoutCart, cartProductsUpdated } from '../../features/cart/cartSlice'
import { fetchCustomerOrders } from '../../features/orders/ordersSlice'
import { useHistory } from 'react-router-dom'
import { CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import CheckoutProductList from './CheckoutProductList'
const axios = require('axios')

const CheckOut = () => {
  
  const dispatch = useDispatch()
  const history = useHistory()

  //Stripe payment state
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
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
        fontSize: "20px",
        "::placeholder": {
          color: "#32325d",
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
      try {
        const orderResponse = await dispatch(checkoutCart())
        await dispatch(fetchCustomerOrders()) //Fetch order state after new order placed
        await dispatch(cartProductsUpdated({})) //Clear cart
        const orderId = (orderResponse.payload.order_id)
        history.push(`/checkout-done/${orderId}`)
      } catch(error) {
        console.log(error)
      }
    }
  }

  return (
      <div className="flex-grow p-5">
        <div className="grid justify-center">
          <div className="m-4">
            <CheckoutProductList />
          </div>

          <div className="m-4 max-w-2xl">
            <h2 className="font-bold text-xl text-center mb-6">Enter credit card info to pay</h2>
            <p className="text-lg">You can use credit card nr 4242424242424242 with any future date, CVC and zip-code for testing. This transaction is just a test and will not charge any money.</p>
          </div>

          <div className="max-w-2xl">
            <div className="m-6">
              <form id="payment-form" className="mt-4" onSubmit={handleSubmit}>
                <div className="">
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                </div>                
                { (!succeeded && !processing) &&
                <div className="m-4 flex justify-center">
                  <button onClick={() => history.push('/cart')}
                  className="m-4 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >Back to Cart
                  </button>
                  <button
                    id="submit"
                    className="m-4 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >Place Order
                  </button>
                </div>
                }
              </form>
            </div>
          </div>

            { processing &&
            <div className="m-4">
              <p>Processing payment</p>
            </div>
            }

            {/* Show any error that happens when processing the payment */}
            {error && (
              <div className="m-4 card-error" role="alert">
                {error}
              </div>
            )}
        </div>
      </div>     
    )
  }
    
export default CheckOut