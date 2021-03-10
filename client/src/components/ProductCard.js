import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, changeProductQuantity, selectCart } from '../features/cart/cartSlice'
import { useHistory } from 'react-router-dom' 
import { selectIsLoggedIn } from '../features/users/usersSlice'

const ProductCard = ({product}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const cartContents = useSelector(selectCart)   

    //Return true if product is already in cart
    const isProductInCart = () => cartContents.hasOwnProperty(product.id)

    const handleAddToCartClick = async () => {
        if (!isLoggedIn) {
            history.push('/login')
            return
        }
        try {
            if (isProductInCart()) {
                console.log('Already in cart')
                dispatch(changeProductQuantity({
                    product_id: product.id,
                    quantity: (cartContents[product.id].quantity + 1 >= 10) ? 10 : cartContents[product.id].quantity + 1
                }))
            } else {
            dispatch(
                addProductToCart({
                    product_id: product.id,
                    quantity: 1
                })
            )}
        } catch (err) {
            console.error('Failed to add to cart: ', err)
        }
    }

    return (

            <div className="p-10">  
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Link to={`/product/${product.id}`}> 
                    <img className="w-full" src={product.image_url} alt="Mountain" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{product.name}</div>
                        <p className="text-gray-700 text-base">
                        {product.description}
                        </p>
                    </div>
                </Link>
                    <div className="px-6 pt-4 pb-2">
                        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${product.price}</div>
                        <button   className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                onClick={handleAddToCartClick}>Add to cart</button>
                    </div>
                </div>
            </div>

    )
  }
  
  export default ProductCard