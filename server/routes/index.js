const express = require('express')
const passport = require('passport')

const { auth, products, users, carts, orders } = require('../controllers')

const router = express.Router()

router
    .post('/auth/signup', auth.signupUser) //Adds a user and creates a cart for the user
    .post('/auth/login', auth.loginUser) //Logs user in and sends a JWT back in cookie
    
    .get('/products', products.getAllProducts)
    .get('/products/:id', products.getProductById)
    .post('/products', passport.authenticate('jwt-admin', {session: false}), products.postProduct)
    .put('/products/:id', passport.authenticate('jwt-admin', {session: false}), products.putProduct)
    .delete('/products/:id', passport.authenticate('jwt-admin', {session: false}), products.deleteProduct)

    .get('/users', passport.authenticate('jwt-admin', {session: false}), users.getAllUsers)
    .get('/users/self', passport.authenticate('jwt-customer', {session: false}), users.getUserSelf) //Customer can access their user info TODO: Don't send hash
    .put('/users/self', passport.authenticate('jwt-customer', {session: false}), users.putUserSelf) //Customer can edit their user info
    .delete('/users/:id', passport.authenticate('jwt-admin', {session: false}), users.deleteUser)

    .get('/carts', passport.authenticate('jwt-admin', {session: false}), carts.getAllCarts) //Gets all products in all carts
    .get('/carts/self', passport.authenticate('jwt-customer', {session: false}), carts.getCartSelf) //Gets products in user's cart
    .post('/carts/self/add', passport.authenticate('jwt-customer', {session: false}), carts.postProductInCartSelf) //Adds a new product to user's cart
    .put('/carts/self/modify', passport.authenticate('jwt-customer', {session: false}), carts.putCartSelf) //Changes quantity of a product in user's cart
    .delete('/carts/self/delete', passport.authenticate('jwt-customer', {session: false}), carts.deleteCartSelf) //Deletes a product from user's cart

    .post('/carts/self/checkout', passport.authenticate('jwt-customer', {session: false}), carts.checkoutCart) //Checks out a user's cart and places an order

    //TODO Limit order operations to orders by self unless admin
    .get('/orders', passport.authenticate('jwt-admin', {session: false}), orders.getAllOrders) //Gets all orders and related users
    .get('/orders/:orderId', orders.getOrderById) //Gets one order
    .get('/orders/user/:userId', orders.getOrdersByUser) //Gets all orders by user
    .post('/orders/:userId', orders.postOrder) //Adds a new empty order for a user
    .post('/orders/:orderId/add', orders.postProductInOrder) //Adds one product to an order
    
module.exports = router