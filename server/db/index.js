const { getProductsDb } = require('./products.db')
const { fetchUsersDb, fetchUserByIdDb, createUserDb, modifyUserDb, removeUserDb } = require('./users.db')
const { getOrdersDb } = require('./orders.db')
const { getCartsDb }  = require('./carts.db')

module.exports = {
  getProductsDb,
  fetchUsersDb, fetchUserByIdDb, createUserDb, modifyUserDb, removeUserDb,
  getOrdersDb,
  getCartsDb
}