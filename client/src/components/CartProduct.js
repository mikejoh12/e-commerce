import { useForm } from "react-hook-form"

const CartProduct = () => {

    const { register } = useForm();
    
    return (
        <div>
            <span>
                <img className="hidden sm:inline max-h-24" src="https://cdn.pocket-lint.com/r/s/970x/assets/images/152137-laptops-review-apple-macbook-pro-2020-review-image1-pbzm4ejvvs-jpg.webp" alt="Mountain" />
                <div className="inline">
                    <p className="inline whitespace-nowrap p-4">MacBook Pro</p>
                </div>
                <p className="inline p-4">$1899</p>
                <div className="inline">
                    <input name="quantity" type="number" min="0" max="10" className="border w-12 rounded p-1 border-blue-300" ref={register()} />
                </div>
            </span>
        </div>
      )
    }
    
export default CartProduct