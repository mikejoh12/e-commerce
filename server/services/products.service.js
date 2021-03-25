const { fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb } = require('../db')

const fetchProducts = async () => {
    return await fetchProductsDb()
}

const fetchProductById = async (id) => {
    return await fetchProductByIdDb(id)
}

const createProduct = async (product) => {
    return await createProductDb(product)
}

const modifyProduct = async (id) => {
    return await modifyProductDb(id)
}

const removeProduct = async (id) => {
    return await removeProductDb(id)
}

module.exports = {
  fetchProducts,
  fetchProductById,
  createProduct,
  modifyProduct,
  removeProduct
}