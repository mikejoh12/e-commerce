const { getProductsDb } = require('./products.db')
const { getUsersDb, createUserDb } = require('./users.db')
const { getOrdersDb } = require('./orders.db')
const { getCartsDb }  = require('./carts.db')

module.exports = {
  getProductsDb,
  getUsersDb, createUserDb,
  getOrdersDb,
  getCartsDb
}