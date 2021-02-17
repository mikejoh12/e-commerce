const { fetchProductsDb, fetchProductByIdDb } = require('./products.db')
const { fetchUsersDb, fetchUserByIdDb, createUserDb, modifyUserDb, removeUserDb } = require('./users.db')
const { getOrdersDb } = require('./orders.db')
const { getCartsDb }  = require('./carts.db')

module.exports = {
  fetchProductsDb, fetchProductByIdDb,
  fetchUsersDb, fetchUserByIdDb, createUserDb, modifyUserDb, removeUserDb,
  getOrdersDb,
  getCartsDb
}