import { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProducts, selectAllProducts } from '../features/products/productsSlice'

const ProductList = () => {
  
  const products = useSelector(selectAllProducts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  return (
      <div className="flex-grow p-5">
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 max-w-7xl mx-auto">
              {products.map(product => <ProductCard
                                        key={product.id}
                                        product={product} />)} 
            </div>
      </div>
    )
  }
  
  export default ProductList