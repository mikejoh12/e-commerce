import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/users/usersSlice'
import { selectCustomerOrders } from '../features/orders/ordersSlice'

const Account = () => {

    const user = useSelector(selectCurrentUser)
    const orders = useSelector(selectCustomerOrders)


    return (
        <div className="flex-grow p-5">
          <div className="grid justify-center">
            <div className="mx-auto">
              <h1>Account info:</h1>
              <ul>
                  <li>{`${user.first_name} ${user.last_name}`}</li>
                  <li>{user.email}</li>
                  <li>{user.address1}</li>
                  <li>{user.address2}</li>
                  <li>{`${user.postcode} ${user.city}`}</li>
                  <li>{user.country}</li>
              </ul>
            </div>
            
            <div className="m-4">
              <h1 className="text-center">Order History</h1>
              <div className="p-10 grid grid-cols-1 gap-5 max-w-7xl mx-auto">
              {Object.keys(orders).map(keyName => 
                    orders[keyName].map(orderItem => {
                     return <div key={`${orderItem.order_id}-${orderItem.product_id}`}
                  >{`${orderItem.order_id} - ${orderItem.name} - ${orderItem.price} - ${orderItem.created_at}`}</div>
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }
    
export default Account