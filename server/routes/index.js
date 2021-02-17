const express = require('express')

const { products, users, carts, orders } = require('../controllers')

const router = express.Router()

router.get('/products', products.getAllProducts) 

router.get('/users', users.getAllUsers)
router.get('/users/:id', users.getUserById)
router.post('/users', users.postUser)
router.put('/users/:id', users.putUser)
router.delete('/users/:id', users.deleteUser)

router.get('/carts', carts.getAllCarts)

router.get('/orders', orders.getAllOrders)

module.exports = router