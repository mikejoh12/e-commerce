const { cartsService, ordersService } = require('../services')
const { fetchCarts, fetchCartById, createProductInCart, modifyCart, removeCartProduct } = cartsService
const { createOrder, createProductInOrder } = ordersService

const getAllCarts = async (req, res, next) => {
      const carts = await fetchCarts()
      res.status(200).json(carts)
      next()
  }

const getCartSelf = async (req, res, next) => {
  const userId = req.user.id //Extract user id from passport user object
    const cart = await fetchCartById(userId)
    res.status(200).json(cart)
    next()
}

const postProductInCartSelf = async (req, res, next) => {
  const cartId = req.user.cart_id
  const { product_id, quantity } = req.body
  const cartProduct = {
    cart_id: cartId,
    product_id,
    quantity
  }
  await createProductInCart(cartProduct)
  res.sendStatus(201)
  next()
}

const putCartSelf = async (req, res, next) => {
  const cartId = req.user.cart_id
  const { product_id, quantity } = req.body
  const updateCartProduct = {
    cart_id: cartId,
    product_id,
    quantity
  }
    const newCart = await modifyCart(updateCartProduct)
    res.status(200).json(newCart)
    next()
}

const deleteCartProductSelf = async (req, res, next) => {
  const cartId = req.user.cart_id
  const { product_id } = req.body
  const cartProduct = {
    cart_id: cartId,
    product_id
  }
    const deleted = await removeCartProduct(cartProduct)
    res.status(200).json(deleted)
    next()
}

const checkoutCart = async (req, res, next) => {
  const cartId = req.user.cart_id
  const user_id = req.user.id
  const cart = await fetchCartById(user_id)
  if (!cart.length) {
    res.status(500).send('Cart is empty')
    next()
  }
  const orderId = await createOrder(user_id)
  //Move all cart items to order
  await Promise.all(cart.map(async(item) => {
    await createProductInOrder({
      order_id: orderId,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    })
    await removeCartProduct({
      cart_id: cartId,
      product_id: item.product.id
    })
  }))
  res.status(201).json({order_id: orderId})
  next()
}

module.exports = {
    getAllCarts,
    getCartSelf,
    postProductInCartSelf,
    putCartSelf,
    deleteCartProductSelf,
    checkoutCart
}