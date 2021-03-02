const ProductDetail = () => {
 
  
  return (
      <div className="flex-grow p-5">
        <div className="p-10">  
            <div className="max-w-4xl mx-auto rounded overflow-hidden shadow-lg">
            <img className="w-full" src="https://cdn.pocket-lint.com/r/s/970x/assets/images/152137-laptops-review-apple-macbook-pro-2020-review-image1-pbzm4ejvvs-jpg.webp" alt="Mountain" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">MacBook Pro</div>
                <p className="text-gray-700 text-base">
                    This is the 2021 MacBook Pro with 16GB ram and an M5 processor.
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">$1899</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Add to cart</span>
            </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default ProductDetail