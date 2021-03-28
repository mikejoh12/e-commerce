import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeProductFromCart, changeProductQuantity } from '../../features/cart/cartSlice'

const CartProduct = ({cartItem, quantity}) => {

    const [productQty, setProductQty] = useState(quantity) 
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(changeProductQuantity({
                product_id: cartItem.id,
                quantity: parseInt(productQty, 10)
            })
        )
    }, [productQty, cartItem.id, dispatch])
    
    const handleRemoveProduct = async() => {
        try {
            await dispatch(
                removeProductFromCart({
                    'product_id': cartItem.id,
                })
            )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex flex-row items-center">
                <div>
                    <img className="m-2 hidden sm:block max-h-24 rounded" src={cartItem.image_url} alt="" />
                </div>
                <div className="m-2 flex-grow">
                    <p>{cartItem.name}</p>
                </div>
                <div className="m-2">
                    <p>${cartItem.price}</p>
                </div>
                <select className="m-2 border border-solid" value={productQty} onChange={event => setProductQty(event.target.value)}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                </select>
                <div className="m-2">
                    <button onClick={handleRemoveProduct} 
                    className="m-4 mt-4 py-2 px-4 cursor-pointer border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >Remove</button>
                </div>
        </div>
      )
    }
    
export default CartProduct