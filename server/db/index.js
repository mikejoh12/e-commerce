const { getProductsDb } = require('./products.db')
const { getUsersDb } = require('./users.db')
const { getOrdersDb } = require('./orders.db')
const { getCartsDb }  = require('./carts.db')

module.exports = {
  getProductsDb,
  getUsersDb,
  getOrdersDb,
  getCartsDb
}