const { fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb } = require('./products.db')
const { fetchUsersDb, fetchUserByIdDb, createUserDb, modifyUserDb, removeUserDb } = require('./users.db')
const { fetchOrdersDb, fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb } = require('./orders.db')
const { fetchCartsDb, fetchCartByIdDb, createCartDb, createProductInCartDb, modifyCartDb, removeCartDb}  = require('./carts.db')

module.exports = {
  fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb,
  fetchUsersDb, fetchUserByIdDb, createUserDb, modifyUserDb, removeUserDb,
  fetchOrdersDb, fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb,
  fetchCartsDb, fetchCartByIdDb, createCartDb, createProductInCartDb, modifyCartDb, removeCartDb
}