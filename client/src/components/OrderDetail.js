import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOrderById } from '../features/orders/ordersSlice'

const OrderProduct = ({productId}) => {
    const { id } = useParams()
    const order = useSelector(state => selectOrderById(state, id))
    const productPrice = parseFloat(order[productId].price) * parseInt(order[productId].quantity, 10)

    return (
        <div>
            Product Id: {productId} | {order[productId].name} | Qty: {order[productId].quantity} | Price: ${productPrice}
        </div>
    )
}

const OrderDetail = () => {

    const { id } = useParams()
    const order = useSelector(state => selectOrderById(state, id))
    const totalPrice = Object.keys(order).reduce((acc, keyName) => 
      acc + parseFloat(order[keyName].price) * parseInt(order[keyName].quantity, 10), 0)

    return (
        <div className="flex-grow p-5">
          <div className="grid justify-center">
            <div className="mx-auto">
                <h1>Order Details:</h1>

                <p>Order Id: {id}</p>
                <div>
                    {Object.keys(order).map(productId =>
                        <OrderProduct   productId={productId}
                                        key={productId} />
                        )}
                </div>
                <p>Total Price: ${totalPrice}</p>
            </div>
          </div>
        </div>
      )
}
    
export default OrderDetail