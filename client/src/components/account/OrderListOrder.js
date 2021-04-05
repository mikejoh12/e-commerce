import { Link } from 'react-router-dom'

const OrderListOrder = ({order, orderNr}) => {

    const totalPrice = Object.keys(order).reduce((acc, keyName) => 
      acc + parseFloat(order[keyName].price) * parseInt(order[keyName].quantity, 10), 0)

    //Get the time from the first item in the order
    const orderTime = order[Object.keys(order)[0]].created_at
    const d = new Date(orderTime)
    var date = d.getDate()
    var month = d.getMonth() + 1
    var year = d.getFullYear()
    var dateStr = month + "/" + date + "/" + year 

    return (
        <Link to={`/account/orders/${orderNr}`}>
            <div className="mx-auto m-2 max-w-md flex flex-col overflow-hidden border rounded shadow-lg">
              <div className="p-4">
                    <p className="text-gray-700 text-lg text-base text-center">
                      Order Nr: {orderNr} Price: ${totalPrice} Date: {dateStr}
                    </p>                
              </div>
            </div>
        </Link>
      )
    }
    
export default OrderListOrder