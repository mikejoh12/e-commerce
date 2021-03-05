import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/users/usersSlice'

const Account = () => {

    const user = useSelector(selectCurrentUser)

    return (
        <div className="flex-grow p-5">
          <div className="grid justify-center">
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
        </div>
      )
    }
    
export default Account