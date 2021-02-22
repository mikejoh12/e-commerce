const { cartsService, ordersService } = require('../services')
const { fetchCarts, fetchCartById, createProductInCart, modifyCart, removeCart } = cartsService
const { createOrder, createProductInOrder } = ordersService

const getAllCarts = async (req, res, next) => {
    try {
      const carts = await fetchCarts()
      res.status(200).json(carts)
      next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) && next(e)
    }
  }

const getCartSelf = async (req, res, next) => {
  const userId = req.user.id //Extract user id from passport user object
  try {
    const cart = await fetchCartById(userId)
    res.status(200).json(cart)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const postProductInCartSelf = async (req, res, next) => {
  const cartId = req.user.cart_id
  const { product_id, quantity } = req.body
  const cartProduct = {
    cart_id: cartId,
    product_id,
    quantity
  }
  try {
    await createProductInCart(cartProduct)
    res.sendStatus(201)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const putCartSelf = async (req, res, next) => {
  const cartId = req.user.cart_id
  const { product_id, quantity } = req.body
  const updateCartProduct = {
    cart_id: cartId,
    product_id,
    quantity
  }
  try {
    const newCart = await modifyCart(updateCartProduct)
    res.status(200).json(newCart)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const deleteCartSelf = async (req, res, next) => {
  const cartId = req.user.cart_id
  const { product_id } = req.body
  const removeCartProduct = {
    cart_id: cartId,
    product_id
  }
  try {
    const deleted = await removeCart(removeCartProduct)
    res.status(200).json(deleted)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const checkoutCart = async (req, res, next) => {
  const cartId = req.user.cart_id
  const user_id = req.user.id
  console.log(`User id: ${user_id}`)
  try {
    const cart = await fetchCartById(user_id)
    console.log(cart)
    if (!cart.length) {
      res.status(500).send('Cart is empty')
      next()
    }
    const orderId = await createOrder(user_id)
    //Move all cart items to order
    cart.forEach(item => {
      createProductInOrder({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      })
      removeCart({
        cart_id: cartId,
        product_id: item.product_id
      })
    })
    res.status(201).send(`Order placed. Order id: ${orderId}`)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
    getAllCarts,
    getCartSelf,
    postProductInCartSelf,
    putCartSelf,
    deleteCartSelf,
    checkoutCart
}