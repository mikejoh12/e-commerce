const { cartsService } = require('../services')

const { fetchCarts, fetchCartById, createCart, createProductInCart, modifyCart, removeCart } = cartsService

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

const getCartById = async (req, res, next) => {
  const { cartId } = req.params
  try {
    const cart = await fetchCartById(cartId)
    res.status(200).json(cart)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const postCart = async (req, res, next) => {
  const { user_id } = req.body
  try {
    await createCart(user_id)
    res.sendStatus(201)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const postProductInCart = async (req, res, next) => {
  const { cartId } = req.params
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

const putCart = async (req, res, next) => {
  const { cartId } = req.params
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

const deleteCart = async (req, res, next) => {
  const { cartId } = req.params
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

module.exports = {
    getAllCarts,
    getCartById,
    postCart,
    postProductInCart,
    putCart,
    deleteCart
}