const { fetchCartsDb, fetchCartByIdDb, createCartDb, createProductInCartDb, modifyCartDb, removeCartProductDb, removeCartDb } = require('../db')

const fetchCarts = async () => {
  try {
    return await fetchCartsDb()
  } catch(e) {
    throw new Error(e.message)
  }
}

const fetchCartById = async (userId) => {
  try {
    return await fetchCartByIdDb(userId)
  } catch(e) {
    throw new Error(e.message)
  }
}

const createCart = async (userId) => {
  try {
    return await createCartDb(userId)
  } catch(e) {
    throw new Error(e.message)
  }
}

const createProductInCart = async(cartProduct) => {
  try {
    return await createProductInCartDb(cartProduct)
  } catch(e) {
    throw new Error(e.message)
  }
}

const modifyCart = async (updateCartProduct) => {
  try {
    return await modifyCartDb(updateCartProduct)
  } catch(e) {
    throw new Error(e.message)
  }
}

const removeCartProduct = async (cartProduct) => {
  try {
    return await removeCartProductDb(cartProduct)
  } catch(e) {
    throw new Error(e.message)
  }
}

const removeCart = async (userId) => {
  try {
    return await removeCartDb(userId)
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  fetchCarts, fetchCartById, createCart, createProductInCart, modifyCart, removeCartProduct, removeCart
}