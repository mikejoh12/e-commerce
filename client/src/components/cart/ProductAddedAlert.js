import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux' 
import { selectProductAddedMsg, selectShowProductAddedMsg, showProductAddedMsgUpdated } from '../../features/cart/cartSlice'

const ProductAddedAlert = alertMsg => {

    const [showMsg, setShowMsg] = useState(false)
    const productAddedMsg = useSelector(selectProductAddedMsg)
    const showProductAddedMsg = useSelector(selectShowProductAddedMsg)
    const dispatch = useDispatch()

    useEffect(() => {
        if (showProductAddedMsg) {
            setShowMsg(true)
            const timeout = setTimeout(() => {
                setShowMsg(false)
                dispatch(showProductAddedMsgUpdated(false))
            }, 2000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [productAddedMsg, showProductAddedMsg, dispatch]);

    return (
        <div>
            <div className="fixed mt-12 inset-x-0 mx-auto">
                { showMsg &&
                    <div className="text-center px-4">
                        <div className="p-2 bg-indigo-800 items-center text-white leading-none rounded-full flex inline-flex" role="alert">
                            <span className="mr-4"><FontAwesomeIcon className="ml-4" icon={faCartArrowDown} size="lg"/></span>
                            <span className="font-semibold mr-2 text-left flex-auto">{productAddedMsg}</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductAddedAlert