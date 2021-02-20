const authService = require('./auth.service')
const productsService = require('./products.service')
const usersService = require('./users.service')
const cartsService = require('./carts.service')
const ordersService = require('./orders.service')

module.exports = {
  authService,
  productsService,
  usersService,
  cartsService,
  ordersService
}