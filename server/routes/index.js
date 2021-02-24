const express = require('express')
const passport = require('passport')
const { check } = require('express-validator')
const { auth, products, users, carts, orders } = require('../controllers')

const router = express.Router()

router
    //Adds a user and creates a cart for the user
    .post('/auth/signup',
    [
        check('password').not().isEmpty().isLength({min: 6, max: 100}),
        check('email').not().isEmpty().isEmail().isLength({max: 100}),
        check('first_name').not().isEmpty().isLength({max: 100}),
        check('last_name').not().isEmpty().isLength({max: 100}),
        check('address1').not().isEmpty().isLength({max: 100}),
        check('address2').isLength({max: 100}),
        check('postcode').not().isEmpty().isLength({max: 10}),
        check('city').not().isEmpty().isLength({max: 100}),
        check('country').isLength({max: 100})
    ],
    auth.signupUser) 
    
    //Logs user in and sends a JWT back in cookie
    .post('/auth/login',
    [
        check('password').not().isEmpty().isLength({min: 6, max: 100}),
        check('email').not().isEmpty().isEmail().isLength({max: 100})
    ],
    auth.loginUser) 
    
    .get('/products', products.getAllProducts)
    .get('/products/:id', products.getProductById)
    
    .post('/products', [
        check('name').not().isEmpty().isLength({max: 100}),
        check('price').not().isEmpty(),
        check('description').not().isEmpty(),
        check('category').not().isEmpty().isLength({max: 100}),
        check('image_url').isLength({max: 100}),
        check('status').not().isEmpty().isLength({max: 100})
    ],
    passport.authenticate('jwt-admin', {session: false}), products.postProduct)

    .put('/products/:id', [
        check('name').not().isEmpty().isLength({max: 100}),
        check('price').not().isEmpty(),
        check('description').not().isEmpty(),
        check('category').not().isEmpty().isLength({max: 100}),
        check('image_url').isLength({max: 100}),
        check('status').not().isEmpty().isLength({max: 100})
    ],
    passport.authenticate('jwt-admin', {session: false}), products.putProduct)
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

    .get('/orders', passport.authenticate('jwt-admin', {session: false}), orders.getAllOrders) //Gets all orders for all users
    .get('/orders/review/:orderId', passport.authenticate('jwt-admin', {session: false}), orders.getOrderById) //Gets one order
    .get('/orders/self', passport.authenticate('jwt-customer', {session: false}), orders.getOrdersSelf) //Gets all orders for current user

    
module.exports = router