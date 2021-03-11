import { Link } from 'react-router-dom'

const OrderListOrder = ({order, orderNr}) => {

    const totalPrice = Object.keys(order).reduce((acc, keyName) => 
      acc + parseFloat(order[keyName].price) * parseInt(order[keyName].quantity, 10), 0)

    //Get the time from the first item in the order
    const orderTime = order[Object.keys(order)[0]].created_at

    return (
        <Link to={`/account/orders/${orderNr}`}>
            <div>
                Order Id: {orderNr} | Total price: ${totalPrice} | Date: {orderTime}
            </div>
        </Link>
      )
    }
    
export default OrderListOrder