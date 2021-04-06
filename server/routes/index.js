const express = require('express')
const passport = require('passport')
const Router = require('express-promise-router')
const { auth, products, users, carts, orders, payment } = require('../controllers')
const { validateGetProducts, validateSignUp, validateLogin, validatePostProduct, validatePutProduct, validateDeleteProduct,
        validatePutUser, validateDeleteUser, validateCart, validateDeleteCartProduct, validateOrder } = require('./validation')

const router = new Router()

router
    .post('/auth/signup', validateSignUp, auth.signupUser) //Adds a user and creates a cart for the user
    .post('/auth/login', validateLogin, auth.loginUser) //Logs user in and sends a JWT back in cookie
    .post('/auth/logout', auth.logoutUser) //Deletes httpOnly cookie to logout
    .get('/auth/google', passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false
      }))
    .get('/auth/google/redirect', passport.authenticate("google",
    { session: false }), auth.loginGoogle) //Logs user in using Google Oauth and issues a JWT back in cookie

    .get('/products', products.getAllProducts)
    .get('/products/:id', validateGetProducts, products.getProductById)
    .post('/products', validatePostProduct, passport.authenticate('jwt-admin', {session: false}), products.postProduct)
    .put('/products/:id', validatePutProduct, passport.authenticate('jwt-admin', {session: false}), products.putProduct)
    .delete('/products/:id', validateDeleteProduct, passport.authenticate('jwt-admin', {session: false}), products.deleteProduct)

    .get('/users', passport.authenticate('jwt-admin', {session: false}), users.getAllUsers)
    .get('/users/self', passport.authenticate('jwt-customer', {session: false}), users.getUserSelf) //Customer can access their user info
    .put('/users/self', validatePutUser, passport.authenticate('jwt-customer', {session: false}), users.putUserSelf) //Customer can edit their user info
    .delete('/users/:id', validateDeleteUser, passport.authenticate('jwt-admin', {session: false}), users.deleteUser) //Delete user and associated cart

    .get('/carts', passport.authenticate('jwt-admin', {session: false}), carts.getAllCarts) //Gets all products in all carts
    .post('/carts/self', passport.authenticate('jwt-customer', {session: false}), carts.syncCartSelf) //Gets products in user's cart and syncs with logged out cart
    .post('/carts/self/product', validateCart, passport.authenticate('jwt-customer', {session: false}), carts.postProductInCartSelf) //Adds a new product to user's cart
    .put('/carts/self/product', validateCart, passport.authenticate('jwt-customer', {session: false}), carts.putCartSelf) //Changes quantity of a product in user's cart
    .delete('/carts/self/product', validateDeleteCartProduct, passport.authenticate('jwt-customer', {session: false}), carts.deleteCartProductSelf) //Deletes a product from user's cart

    .post('/carts/self/checkout', passport.authenticate('jwt-customer', {session: false}), carts.checkoutCart) //Checks out a user's cart and places an order

    .get('/orders', passport.authenticate('jwt-admin', {session: false}), orders.getAllOrders) //Gets all orders for all users
    .get('/orders/review/:orderId', validateOrder, passport.authenticate('jwt-admin', {session: false}), orders.getOrderById) //Gets one order
    .get('/orders/self', passport.authenticate('jwt-customer', {session: false}), orders.getOrdersSelf) //Gets all orders for current user

    .post('/payment/create-payment-intent', passport.authenticate('jwt-customer', {session: false}), payment.createPaymentIntent)
module.exports = router