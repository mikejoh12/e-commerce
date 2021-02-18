const { cartsService } = require('../services')

const { fetchCarts, fetchCartById, createCart, modifyCart, removeCart } = cartsService

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
  const { userId } = req.params
  try {
    const cart = await fetchCartById(userId)
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

const putCart = async (req, res, next) => {
  const { userId } = req.params
  //TODO - Add cart updating logic
  try {
    const newCart = await modifyCart(userId)
    res.status(200).json(newCart)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const deleteCart = async (req, res, next) => {
  const { userId } = req.params
  try {
    const deleted = await removeCart(userId)
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
    putCart,
    deleteCart
}