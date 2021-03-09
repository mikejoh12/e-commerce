const auth = require('./auth-controller')
const products = require('./products-controller')
const users = require('./users-controller')
const carts = require('./carts-controller')
const orders = require('./orders-controller')
const payment = require('./payment-controller')

module.exports = {
    auth,
    products,
    users,
    carts,
    orders,
    payment
}