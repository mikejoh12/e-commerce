const { fetchOrdersDb, fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb } = require('../db')

/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const fetchOrders = async () => {
  try {
    return await fetchOrdersDb()
  } catch(e) {
    throw new Error(e.message)
  }
}

const fetchOrderById = async (orderId) => {
  try {
    return await fetchOrderByIdDb(orderId)
  } catch(e) {
    throw new Error(e.message)
  }
}

const fetchOrdersByUser = async (userId) => {
  try {
    return await fetchOrdersByUserDb(userId)
  } catch(e) {
    throw new Error(e.message)
  }
}

const createOrder = async (userId) => {
  const order = {
    user_id: userId,
    status: 'Placed order'
  }
  try {
    return await createOrderDb(order)
  } catch(e) {
    throw new Error(e.message)
  }
}

const createProductInOrder = async (orderProduct) => {
  try {
    return await createProductInOrderDb(orderProduct)
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  fetchOrders, fetchOrderById, fetchOrdersByUser, createOrder, createProductInOrder
}