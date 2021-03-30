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

  //Use this during dev of pagination
  let manyProductCards = []
  for (let i = 0; i < 10; i++) {
    const productsOnce = Object.keys(products).map(keyName => <ProductCard
      key={i.toString() + '-' + products[keyName].id.toString()}
      product={products[keyName]} />)
    manyProductCards.push(...productsOnce)
  }

  //Use this after pagination is done
  const productCards = Object.keys(products).map(keyName => <ProductCard
    key={products[keyName].id}
    product={products[keyName]} />)
  
  return (
      <div className="flex-grow px-8">
            <div className="p-4 flex flex-wrap justify-center max-w-screen-2xl mx-auto">
              {manyProductCards} 
            </div>
      </div>
    )
  }
  
  export default ProductList