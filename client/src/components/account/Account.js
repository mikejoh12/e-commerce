import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/users/usersSlice'
import OrderList from './OrderList'

const Account = () => {

    const user = useSelector(selectCurrentUser)

    return (
              
          <div className="mx-auto pt-8 m-4 max-w-md flex flex-col">
            
            <div className="border rounded shadow-lg overflow-hidden p-4">
              <div className="font-bold text-xl text-center mb-2">
                <h2>Account info:</h2>
              </div>
              <ul className="text-gray-700 p-2 text-lg text-base text-center">
                <li>{`${user.first_name} ${user.last_name}`}</li>
                <li>{user.email}</li>
                <li>{user.address1}</li>
                <li>{user.address2}</li>
                <li>{`${user.postcode} ${user.city}`}</li>
                <li>{user.country}</li>
              </ul> 
            </div>

            <OrderList />
          </div>
      )
    }
    
export default Account