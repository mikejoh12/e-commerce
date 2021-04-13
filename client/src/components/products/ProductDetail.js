import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectProductById, selectFetchAllProductsStatus } from '../../features/products/productsSlice'
import { selectCart, addProductToCart, changeProductQuantity, productAddedMsgUpdated, showProductAddedMsgUpdated } from '../../features/cart/cartSlice'

const ProductDetail = () => {
 
  let { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector(state => selectProductById(state, id))
  const cartContents = useSelector(selectCart)   
  const productsStatus = useSelector(selectFetchAllProductsStatus)

  //Return true if product is already in cart
  const isProductInCart = () => cartContents.hasOwnProperty(product.id)

  const handleAddToCartClick = async () => {
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
        dispatch(productAddedMsgUpdated(`Added ${product.name} to Cart`))
        dispatch(showProductAddedMsgUpdated(true))
    } catch (err) {
        console.error('Failed to add to cart: ', err)
    }
}

  return (
      <div className="flex-grow p-5">
        { productsStatus === 'succeeded' &&
        <div className="p-10">  
            <div className="max-w-4xl mx-auto rounded overflow-hidden shadow-lg">
            <img className="w-full" src={product.image_url} alt={product.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl text-center mb-2">{product.name}</div>
                <p className="text-gray-700 text-base text-center">
                    {product.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 text-center">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-4 mb-2">${product.price}</span>
                <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-4 mb-2 hover:bg-indigo-200 active:bg-indigo-400 focus:outline-none"
                        onClick={handleAddToCartClick}>Add to cart</button>
            </div>
            </div>
        </div>
        }
      </div>
    )
  }
  
  export default ProductDetail