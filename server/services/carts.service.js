const { fetchCartsDb, fetchCartByIdDb, createCartDb, modifyCartDb, removeCartDb } = require('../db')

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

const modifyCart = async (userId) => {
  try {
    return await modifyCartDb(userId)
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
  fetchCarts, fetchCartById, createCart, modifyCart, removeCart
}