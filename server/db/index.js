const { fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb } = require('./products.db')
const { fetchUsersDb, fetchUserByIdDb, createUserDb, modifyUserDb, removeUserDb } = require('./users.db')
const { getOrdersDb } = require('./orders.db')
const { fetchCartsDb, fetchCartByIdDb, createCartDb, modifyCartDb, removeCartDb}  = require('./carts.db')

module.exports = {
  fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb,
  fetchUsersDb, fetchUserByIdDb, createUserDb, modifyUserDb, removeUserDb,
  getOrdersDb,
  fetchCartsDb, fetchCartByIdDb, createCartDb, modifyCartDb, removeCartDb
}