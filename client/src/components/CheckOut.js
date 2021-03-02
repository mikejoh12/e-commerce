import CartProduct from './CartProduct'

const CheckOut = () => {
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
                <button
                    className="mx-auto mt-4 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => alert('Order Placed!')}>
                    Place Order
                </button>  
              </div>
            </div>     
          </div>
        </div>
      )
    }
    
export default CheckOut