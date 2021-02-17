const { fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb } = require('../db')

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

const createProduct = async (product) => {
  try {
    return await createProductDb(product)
  } catch(e) {
    throw new Error(e.message)
  }
}

const modifyProduct = async (id) => {
  try {
    return await modifyProductDb(id)
  } catch(e) {
    throw new Error(e.message)
  }
}

const removeProduct = async (id) => {
  try {
    return await removeProductDb(id)
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  fetchProducts,
  fetchProductById,
  createProduct,
  modifyProduct,
  removeProduct
}