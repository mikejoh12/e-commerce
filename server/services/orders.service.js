const { fetchOrdersDb, fetchOrderByIdDb, createOrderDb } = require('../db')

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

const createOrder = async (userId) => {
  try {
    return await createOrderDb(userId)
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  fetchOrders, fetchOrderById, createOrder
}