import CartProduct from './CartProduct'

const Cart = () => {
  const products = []
  for (let i = 0; i < 8; i++) {
    products.push(i)
  }

    return (
        <div className="flex-grow p-5">
          <div className="grid justify-center">
              {products.map(product => <CartProduct product={product}/>)}
          </div>
        </div>
      )
    }
    
export default Cart