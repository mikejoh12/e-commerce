const CheckoutProduct = ({cartItem, quantity}) => {

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
                <div className="m-2">
                    <p>Qty: {quantity}</p>
                </div>
        </div>
      )
}
    
export default CheckoutProduct