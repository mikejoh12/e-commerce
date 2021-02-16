const { getOrdersDb } = require('../db')

/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const getOrders = async () => {
  try {
    return await getOrdersDb()
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  getOrders
}