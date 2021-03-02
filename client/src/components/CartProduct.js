const CartProduct = () => {

    return (
        <div>
            <span>
                <img className="hidden sm:inline max-h-24" src="https://cdn.pocket-lint.com/r/s/970x/assets/images/152137-laptops-review-apple-macbook-pro-2020-review-image1-pbzm4ejvvs-jpg.webp" alt="Mountain" />
                <div className="inline">
                    <p className="inline whitespace-nowrap p-4">MacBook Pro</p>
                </div>
                <p className="inline p-4">$1899</p>
                <div className="inline">
                    <span className="p-2">-</span>
                    <span>Qty</span>
                    <span className="p-2">+</span>
                </div>
            </span>
        </div>
      )
    }
    
export default CartProduct