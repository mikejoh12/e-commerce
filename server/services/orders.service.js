const { fetchOrdersDb, fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb } = require('../db')

/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const fetchOrders = async () => {
    return await fetchOrdersDb()
}

const fetchOrderById = async (orderId) => {
    return await fetchOrderByIdDb(orderId)
}

const fetchOrdersByUser = async (userId) => {
    return await fetchOrdersByUserDb(userId)
}

const createOrder = async (userId) => {
  const order = {
    user_id: userId,
    status: 'Placed order'
  }
    return await createOrderDb(order)
}

const createProductInOrder = async (orderProduct) => {

    return await createProductInOrderDb(orderProduct)
}

module.exports = {
  fetchOrders, fetchOrderById, fetchOrdersByUser, createOrder, createProductInOrder
}