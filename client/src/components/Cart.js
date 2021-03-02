import CartProduct from './CartProduct'
import { Link } from 'react-router-dom'

const Cart = () => {
  const products = []
  for (let i = 0; i < 8; i++) {
    products.push(i)
  }

    return (
        <div className="flex-grow p-5">
          <div className="grid justify-center">
              {products.map(product => <CartProduct key={product}/>)}
            <div>
              <div>
                <Link to="/checkout">
                  <button className="mx-auto mt-4 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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