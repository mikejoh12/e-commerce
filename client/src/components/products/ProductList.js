import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProducts, selectAllProducts } from '../../features/products/productsSlice'
import ReactPaginate from 'react-paginate'
import './Pagination.css'

const ProductList = () => {
  
  const products = useSelector(selectAllProducts)
  const dispatch = useDispatch()

  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [perPage] = useState(2)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  useEffect(() => {
    const slice = Object.keys(products).slice(offset, offset + perPage)
    const postData = slice.map(keyName =>
            <ProductCard
              key={products[keyName].id}
              product={products[keyName]} />)
    setData(postData)
    setPageCount(Math.ceil(Object.keys(products).length / perPage))
  }, [products, offset, perPage])

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setOffset(selectedPage + 1)
  }

  return (
            <div className="flex flex-col flex-grow">
              <div className="flex-grow">
                <div className="p-4 flex flex-wrap justify-center max-w-screen-2xl mx-auto">
                  {data}
                </div>
              </div>
              <div className="p-4 flex justify-center mx-auto">
                <ReactPaginate
                              previousLabel={"prev"}
                              nextLabel={"next"}
                              breakLabel={"..."}
                              breakClassName={"break-me"}
                              pageCount={pageCount}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={handlePageClick}
                              containerClassName={"pagination"}
                              subContainerClassName={"pages pagination"}
                              activeClassName={"active"}/>
              </div>
            </div>
    )
  }
  
  export default ProductList