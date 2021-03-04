import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProductById} from '../features/products/productsSlice'

const ProductDetail = () => {
 
  let { id } = useParams()
  console.log(id)
  const product = useSelector(state => selectProductById(state, id))
  console.log(product)

  return (
      <div className="flex-grow p-5">
        <div className="p-10">  
            <div className="max-w-4xl mx-auto rounded overflow-hidden shadow-lg">
            <img className="w-full" src={product.image_url} alt={product.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">
                    {product.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.price}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Add to cart</span>
            </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default ProductDetail