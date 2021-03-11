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

            <div className="m-4 max-w-sm flex flex-col overflow-hidden rounded shadow-lg">
                <div className="flex flex-col flex-grow justify-center">
                    <Link to={`/product/${product.id}`}>  
                        <img className="w-full" src={product.image_url} alt="Mountain" />
                    </Link>
                </div>  
                    <div className="flex flex-col justify-center h-48">
                        <Link to={`/product/${product.id}`}>  
                            <div className="p-2">
                                <div className="font-bold text-xl text-center mb-2">{product.name}</div>
                                <p className="text-gray-700 text-base text-center">
                                {product.description}
                                </p>
                            </div>
                        </Link>                        
                        <div className="p-2 text-center">
                            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${product.price}</div>
                            <button   className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                    onClick={handleAddToCartClick}>Add to cart</button>
                        </div>
                    </div>
            </div>

    )
  }
  
  export default ProductCard