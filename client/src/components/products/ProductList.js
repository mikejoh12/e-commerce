import { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProducts, selectAllProducts } from '../../features/products/productsSlice'

const ProductList = () => {
  
  const products = useSelector(selectAllProducts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  return (
      <div className="flex-grow px-8">
            <div className="p-4 flex flex-wrap justify-center max-w-screen-2xl mx-auto">
              {Object.keys(products).map(keyName => <ProductCard
                                        key={products[keyName].id}
                                        product={products[keyName]} />)} 
            </div>
      </div>
    )
  }
  
  export default ProductList