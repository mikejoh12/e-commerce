import { useSelector } from 'react-redux'
import { selectCustomerOrders } from '../features/orders/ordersSlice'
import OrderListOrder from './OrderListOrder'

const OrderList = () => {

    const orders = useSelector(selectCustomerOrders)


    return (
            <div className="m-4">
              <h1 className="text-center">Order History</h1>
              <div className="p-10 grid grid-cols-1 gap-5 max-w-7xl mx-auto">
                {Object.keys(orders).map(orderNr => 
                        <OrderListOrder key={orderNr}
                                        order={orders[orderNr]}
                                        orderNr={orderNr} />
                )}
              </div>
            </div>
      )
    }
    
export default OrderList