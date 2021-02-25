const express = require('express')
const passport = require('passport')
const { auth, products, users, carts, orders } = require('../controllers')
const { validateGetProducts, validateSignUp, validateLogin, validatePostProduct, validatePutProduct, validateDeleteProduct,
        validatePutUser, validateDeleteUser, validateCart, validateDeleteCart, validateOrder } = require('./validation')

const router = express.Router()

router
/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     description: Signs up a user.
 *     produces: application/json
 *     parameters:
 *             - name: email
 *               in: formData
 *               required: true
 *             - name: password
 *               in: formData
 *               required: true    
 *             - name: first_name
 *               in: formData
 *               required: true
 *             - name: last_name
 *               in: formData
 *               required: true
 *             - name: address1
 *               in: formData
 *               required: true
 *             - name: address2
 *               in: formData
 *               required: false    
 *             - name: postcode
 *               in: formData
 *               required: true
 *             - name: city
 *               in: formData
 *               required: true
 *             - name: country
 *               in: formData
 *               required: false
 *     responses:
 *       201:
 *         description: Returns the new userId and cartId.
 */
    .post('/auth/signup', validateSignUp, auth.signupUser) //Adds a user and creates a cart for the user
    
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     description: Logs a user in and returns a cookie containing a JWT.
 *     produces: application/json
 *     parameters:
 *             - name: email
 *               in: formData
 *               required: true
 *             - name: password
 *               in: formData
 *               required: true
 *     responses:
 *       200:
 *         description: Ok
 */
    .post('/auth/login', validateLogin, auth.loginUser) //Logs user in and sends a JWT back in cookie
    
/**
 * @openapi
 * definitions:
 *   Product:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       price:
 *         type: decimal
 *       description:
 *         type: string
 *       category:
 *         type: string
 *       image_url:
 *         type: string
 *       status:
 *         type: string
 */

/**
 * @openapi
 * /api/products:
 *   get:
 *     description: Returns all products
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of all products
 *         schema:
 *           $ref: '#/definitions/Product'
 */
    .get('/products', products.getAllProducts)

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     description: Returns one products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: One product object
 *         schema:
 *           $ref: '#/definitions/Product'
 */
    .get('/products/:id', validateGetProducts, products.getProductById)

    .post('/products', validatePostProduct, passport.authenticate('jwt-admin', {session: false}), products.postProduct)
    .put('/products/:id', validatePutProduct, passport.authenticate('jwt-admin', {session: false}), products.putProduct)
    .delete('/products/:id', validateDeleteProduct, passport.authenticate('jwt-admin', {session: false}), products.deleteProduct)

    .get('/users', passport.authenticate('jwt-admin', {session: false}), users.getAllUsers)
    
/**
 * @openapi
 * /api/users/self:
 *   get:
 *     description: Returns info about the logged in user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: cookie
 *         required: true
 *     responses:
 *       200:
 *         description: Returns object containing user info
 */
    .get('/users/self', passport.authenticate('jwt-customer', {session: false}), users.getUserSelf) //Customer can access their user info

/**
 * @openapi
 * /api/users/self:
 *   put:
 *     description: Updates the logged in user
 *     produces: application/json
 *     parameters:
 *             - name: id
 *               in: cookie
 *               required: true
 *             - name: email
 *               in: formData
 *               required: true
 *             - name: first_name
 *               in: formData
 *               required: true    
 *             - name: last_name
 *               in: formData
 *               required: true
 *             - name: address1
 *               in: formData
 *               required: true
 *             - name: address2
 *               in: formData
 *               required: true
 *             - name: postcode
 *               in: formData
 *               required: true   
 *             - name: city
 *               in: formData
 *               required: true
 *             - name: country
 *               in: formData
 *               required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 */
    .put('/users/self', validatePutUser, passport.authenticate('jwt-customer', {session: false}), users.putUserSelf) //Customer can edit their user info
    
    .delete('/users/:id', validateDeleteUser, passport.authenticate('jwt-admin', {session: false}), users.deleteUser) //Todo: Delete related cart for user

    .get('/carts', passport.authenticate('jwt-admin', {session: false}), carts.getAllCarts) //Gets all products in all carts
    
    
/**
 * @openapi
 * /api/carts/self:
 *   get:
 *     description: Returns all products in cart.
 *     parameters:
 *             - name: cart_id
 *               in: cookie
 *               required: true
 *     produces:
 *             - application/json
 *     responses:
 *       200:
 *         description: Ok
 */
    .get('/carts/self', passport.authenticate('jwt-customer', {session: false}), carts.getCartSelf) //Gets products in user's cart

/**
 * @openapi
 * /api/carts/self:
 *   post:
 *     description: Adds a new product of a specified quantity to cart.
 *     produces: application/json
 *     parameters:
 *             - name: cart_id
 *               in: cookie
 *               required: true
 *             - name: product_id
 *               in: formData
 *               required: true
 *             - name: quantity
 *               in: formData
 *               required: true    
 *     responses:
 *       201:
 *         description: Created
 */
    .post('/carts/self', validateCart, passport.authenticate('jwt-customer', {session: false}), carts.postProductInCartSelf) //Adds a new product to user's cart
    
/**
 * @openapi
 * /api/carts/self:
 *   put:
 *     description: Changes the quantity of a product in the cart.
 *     produces: application/json
 *     parameters:
 *             - name: cart_id
 *               in: cookie
 *               required: true
 *             - name: product_id
 *               in: formData
 *               required: true
 *             - name: quantity
 *               in: formData
 *               required: true    
 *     responses:
 *       200:
 *         description: Ok
 */
    .put('/carts/self', validateCart, passport.authenticate('jwt-customer', {session: false}), carts.putCartSelf) //Changes quantity of a product in user's cart
    
/**
 * @openapi
 * /api/carts/self:
 *   delete:
 *     description: Deletes a product in the cart.
 *     produces: application/json
 *     parameters:
 *             - name: cart_id
 *               in: cookie
 *               required: true
 *             - name: product_id
 *               in: formData
 *               required: true
 *     responses:
 *       200:
 *         description: Ok
 */
    .delete('/carts/self', validateDeleteCart, passport.authenticate('jwt-customer', {session: false}), carts.deleteCartSelf) //Deletes a product from user's cart

/**
 * @openapi
 * /api/carts/self/checkout:
 *   post:
 *     description: Places an order and moves products from cart to the order.
 *     produces: application/json
 *     parameters:
 *             - name: cart_id
 *               in: cookie
 *               required: true
 *             - name: id
 *               in: cookie
 *               required: true    
 *     responses:
 *       201:
 *         description: Returns an object with the order_id.
 */
    .post('/carts/self/checkout', passport.authenticate('jwt-customer', {session: false}), carts.checkoutCart) //Checks out a user's cart and places an order

    .get('/orders', passport.authenticate('jwt-admin', {session: false}), orders.getAllOrders) //Gets all orders for all users
    .get('/orders/review/:orderId', validateOrder, passport.authenticate('jwt-admin', {session: false}), orders.getOrderById) //Gets one order

/**
 * @openapi
 * /api/orders/self:
 *   get:
 *     description: Returns all orders by a customer.
 *     parameters:
 *             - name: id
 *               in: cookie
 *               required: true
 *     produces:
 *             - application/json
 *     responses:
 *       200:
 *         description: Ok
 */
    .get('/orders/self', passport.authenticate('jwt-customer', {session: false}), orders.getOrdersSelf) //Gets all orders for current user

module.exports = router