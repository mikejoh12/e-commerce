import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom' 

const CheckOutDone = () => {
  
    return (
        <div className="flex-grow p-5">
            <div>
                <p className="font-bold text-center text-xl mb-2 text-gray-700 text-base">
                  Order Complete.
                </p>
            </div>
        </div>
      )
}
    
export default CheckOutDone