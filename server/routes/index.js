const express = require('express')
const passport = require('passport')

const { auth, products, users, carts, orders } = require('../controllers')

const router = express.Router()

router
    .post('/auth/signup', auth.signupUser) //Adds a user
    .post('/auth/login', auth.loginUser) //Logs user in and sends a JWT back
    
    .get('/products', products.getAllProducts)
    .get('/products/:id', products.getProductById)
    .post('/products', passport.authenticate('jwt-admin', {session: false}), products.postProduct)
    .put('/products/:id', passport.authenticate('jwt-admin', {session: false}), products.putProduct)
    .delete('/products/:id', passport.authenticate('jwt-admin', {session: false}), products.deleteProduct)

    .get('/users', passport.authenticate('jwt-admin', {session: false}), users.getAllUsers)
    .get('/users/:id', passport.authenticate('jwt-admin', {session: false}), users.getUserById)
    .put('/users/:id', users.putUser) //TODO So only user can update self
    .delete('/users/:id', passport.authenticate('jwt-admin', {session: false}), users.deleteUser)

    //TODO Limit cart operations to cart owned by user unless admin
    .get('/carts', passport.authenticate('jwt-admin', {session: false}), carts.getAllCarts) //Gets all products in all carts
    .get('/carts/:cartId', carts.getCartById) //Gets all products in a cart
    .post('/carts', carts.postCart) //Adds a shopping cart for a user
    .post('/carts/:cartId/add', carts.postProductInCart) //Adds a new product to a cart
    .put('/carts/:cartId', carts.putCart) //Changes quantity of a product in a cart
    .delete('/carts/:cartId', carts.deleteCart) //Deletes a product from a cart

    .post('/carts/:cartId/checkout', carts.checkoutCart) //Checks out a cart and places an order

    //TODO Limit order operations to orders by self unless admin
    .get('/orders', passport.authenticate('jwt-admin', {session: false}), orders.getAllOrders) //Gets all orders and related users
    .get('/orders/:orderId', orders.getOrderById) //Gets one order
    .get('/orders/user/:userId', orders.getOrdersByUser) //Gets all orders by user
    .post('/orders/:userId', orders.postOrder) //Adds a new empty order for a user
    .post('/orders/:orderId/add', orders.postProductInOrder) //Adds one product to an order
    
module.exports = router