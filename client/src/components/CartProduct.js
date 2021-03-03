import { useForm } from "react-hook-form"

const CartProduct = ({cartItem}) => {

    const { register } = useForm();
    
    return (
        <div className="m-4">
            <span>
                <img className="hidden sm:inline max-h-24" src={cartItem.product.image_url} alt="" />
                <div className="inline">
                    <p className="inline whitespace-nowrap p-4">{cartItem.product.description}</p>
                </div>
                <p className="inline p-4">{cartItem.product.price}</p>
                <div className="inline">
                    <input name="quantity" type="number" value={cartItem.quantity} min="0" max="10" className="border w-12 rounded p-1 border-blue-300" ref={register()} />
                </div>
            </span>
        </div>
      )
    }
    
export default CartProduct