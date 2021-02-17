const { fetchProductsDb, fetchProductByIdDb } = require('../db')

const fetchProducts = async () => {
  try {
    return await fetchProductsDb()
  } catch(e) {
    throw new Error(e.message)
  }
}

const fetchProductById = async (id) => {
  try {
    return await fetchProductByIdDb(id)
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  fetchProducts,
  fetchProductById
}