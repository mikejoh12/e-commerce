import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
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
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Add to cart</span>
                </div>
                </div>
            </div>
        </Link>
    )
  }
  
  export default ProductCard