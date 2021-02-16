const express = require('express')

const { products, users, carts, orders } = require('../controllers')

const router = express.Router()

router.get('/products', products.getAllProducts)

router.get('/users', users.getAllUsers)
router.post('/users', users.postUser)

router.get('/carts', carts.getAllCarts)

router.get('/orders', orders.getAllOrders)

module.exports = router