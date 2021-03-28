import { useSelector } from 'react-redux'
import { selectCart } from '../../features/cart/cartSlice'
import { selectAllProducts } from '../../features/products/productsSlice'
import CheckoutProduct from './CheckoutProduct'

const CheckoutProductList = () => {

    const cartContents = useSelector(selectCart)
    const products = useSelector(selectAllProducts)
  
    const totalPrice = Object.keys(cartContents).reduce((acc, keyName) => 
      acc + parseFloat(products[keyName].price) * parseInt(cartContents[keyName].quantity, 10), 0)
  

    return (
            <div>
                <div className="grid justify-center">
                
                {Object.keys(cartContents).map(keyName =>
                        <CheckoutProduct  key={keyName}
                                    cartItem={products[keyName]}
                                    quantity={cartContents[keyName].quantity}/>
                                    )}
                </div>
                { (totalPrice > 0) &&
                <div className="mt-4">
                    <p className="font-bold text-center text-xl mb-2 text-gray-700 text-base">
                    Total price: ${totalPrice}
                    </p>
                </div>
                }
            </div>
      )
    }
    
export default CheckoutProductList