import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../features/cart/cartSlice'

const ProductCard = ({product}) => {
    
    const dispatch = useDispatch()
    
    const onAddToCartClicked = async () => {
        console.log('Add to cart')
        try {
            const result = await dispatch(
                addProductToCart({
                    product_id: product.id,
                    quantity: 1
                })
            )
            console.log(result)
        } catch (err) {
            console.error('Failed to add to cart: ', err)
        }
    }

    return (
        <Link to={`/product/${product.id}`}>
            <div className="p-10">  
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full" src={product.image_url} alt="Mountain" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">
                       {product.description}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.price}</span>
                    <span   className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                            onClick={onAddToCartClicked}>Add to cart</span>
                </div>
                </div>
            </div>
        </Link>
    )
  }
  
  export default ProductCard