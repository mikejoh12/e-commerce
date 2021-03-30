import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOrderById } from '../../features/orders/ordersSlice'

const OrderProduct = ({productId}) => {
    const { id } = useParams()
    const order = useSelector(state => selectOrderById(state, id))
    const productPrice = parseFloat(order[productId].price) * parseInt(order[productId].quantity, 10)

    return (

                  <div className="mx-auto m-4 max-w-md flex flex-col overflow-hidden border rounded shadow-lg">
                    <div className="p-4">
                          <p className="text-gray-700 text-lg text-base text-center">
                            Product Id: {productId} Name: {order[productId].name}
                          </p>
                          <p className="text-gray-700 text-lg text-base text-center">
                            Qty: {order[productId].quantity} Price: ${productPrice}
                          </p>
                    </div>
                  </div>
    )
}

const OrderDetail = () => {

    const { id } = useParams()
    const order = useSelector(state => selectOrderById(state, id))
    const totalPrice = Object.keys(order).reduce((acc, keyName) => 
      acc + parseFloat(order[keyName].price) * parseInt(order[keyName].quantity, 10), 0)

    return (
          <div className="grid justify-center">
            <div className="mx-auto">
                <h1 className="font-bold text-xl text-center p-2">Order Id: {id}</h1>
                <div>
                    {Object.keys(order).map(productId =>
                        <OrderProduct   productId={productId}
                                        key={productId} />
                        )}
                </div>
                <p className="font-bold text-lg text-center p-2">Total Price: ${totalPrice}</p>
            </div>
          </div>
      )
}
    
export default OrderDetail