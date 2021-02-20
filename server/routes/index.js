const express = require('express')
const passport = require('passport')

const { auth, products, users, carts, orders } = require('../controllers')

const router = express.Router()

router
    .post('/auth/signup', auth.signupUser) //Adds a user
    .post('/auth/login', auth.loginUser)
    
    .get('/products', products.getAllProducts) //Add query string for category
    .get('/products/:id', products.getProductById)
    .post('/products', products.postProduct)
    .put('/products/:id', products.putProduct)
    .delete('/products/:id', products.deleteProduct)

    .get('/users', passport.authenticate('jwt', {session: false}), users.getAllUsers)
    .get('/users/:id', users.getUserById)
    .put('/users/:id', users.putUser)
    .delete('/users/:id', users.deleteUser)

    .get('/carts', carts.getAllCarts) //Gets all products in all carts
    .get('/carts/:cartId', carts.getCartById) //Gets all products in a cart
    .post('/carts', carts.postCart) //Adds a shopping cart for a user
    .post('/carts/:cartId/add', carts.postProductInCart) //Adds a new product to a cart
    .put('/carts/:cartId', carts.putCart) //Changes quantity of a product in a cart
    .delete('/carts/:cartId', carts.deleteCart) //Deletes a product from a cart

    .post('/carts/:cartId/checkout', carts.checkoutCart) //Checks out a cart and places an order

    .get('/orders', orders.getAllOrders) //Gets all orders and related users
    .get('/orders/:orderId', orders.getOrderById) //Gets one order
    .get('/orders/user/:userId', orders.getOrdersByUser) //Gets all orders by user
    .post('/orders/:userId', orders.postOrder) //Adds a new empty order for a user
    .post('/orders/:orderId/add', orders.postProductInOrder) //Adds one product to an order
    
module.exports = router