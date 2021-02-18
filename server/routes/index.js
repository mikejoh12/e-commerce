const express = require('express')

const { products, users, carts, orders } = require('../controllers')

const router = express.Router()

router.get('/products', products.getAllProducts)
    .get('/products/:id', products.getProductById)
    .post('/products', products.postProduct)
    .put('/products/:id', products.putProduct)
    .delete('/products/:id', products.deleteProduct)

    .get('/users', users.getAllUsers)
    .get('/users/:id', users.getUserById)
    .post('/users', users.postUser)
    .put('/users/:id', users.putUser)
    .delete('/users/:id', users.deleteUser)

    .get('/carts', carts.getAllCarts)
    .get('/carts/:userId', carts.getCartById)
    .post('/carts', carts.postCart)
    .put('/carts/:userId', carts.putCart)
    .delete('/carts/:userId', carts.deleteCart)

    .get('/orders', orders.getAllOrders)


module.exports = router