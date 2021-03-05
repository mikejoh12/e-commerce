import { useForm } from "react-hook-form"

const CartProduct = ({cartItem}) => {

    const { register } = useForm();

    const handleQtyChange = () => {
        console.log('Quantity changed')
    }

    return (
        <div className="flex flex-row items-center">
                <div>
                    <img className="m-2 hidden sm:block max-h-24 rounded" src={cartItem.product.image_url} alt="" />
                </div>
                <div className="m-2 flex-grow">
                    <p>{cartItem.product.description}</p>
                </div>
                <div className="m-2">
                    <p>${cartItem.product.price}</p>
                </div>
                <div className="m-2">
                    <input name="quantity" type="number" onChange={handleQtyChange} value={cartItem.quantity} min="0" max="10" className="border w-12 rounded p-1 border-blue-300" ref={register()} />
                </div>
        </div>
      )
    }
    
export default CartProduct