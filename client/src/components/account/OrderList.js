import { useSelector } from 'react-redux'
import { selectCustomerOrders } from '../../features/orders/ordersSlice'
import OrderListOrder from './OrderListOrder'

const OrderList = () => {

    const orders = useSelector(selectCustomerOrders)


    return (
            <div className="m-2 mx-auto">
              <h1 className="font-bold text-xl text-center pt-8">Order History</h1>
              <div className="p-2 grid grid-cols-1 align-center gap-2 max-w-7xl mx-auto">
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