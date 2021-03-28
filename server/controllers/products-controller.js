const { productsService } = require('../services')
const { validationResult } = require('express-validator')
const { fetchProducts, fetchProductById, createProduct, modifyProduct, removeProduct } = productsService

const getAllProducts = async (req, res, next) => {
      const products = await fetchProducts()
      res.status(200).json(products)
      next()
  }

const getProductById = async (req, res, next) => {
  const { id } = req.params
    const product = await fetchProductById(id)
    res.status(200).json(product)
    next()
}

const postProduct = async (req, res, next) => {
  //Reject if validation fails
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  }
  
  const { name, price, description, category, image_url, status } = req.body
  const product = {
    name,
    price,
    description,
    category,
    image_url,
    status
  }
    await createProduct(product)
    res.sendStatus(201)
    next()
}

//putProduct can update all info except id
const putProduct = async (req, res, next) => {
  //Reject if validation fails
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  }
  
  const { id } = req.params
  const { name, price, description, category, image_url, status } = req.body
  const product = {
    id,
    name,
    price,
    description,
    category,
    image_url,
    status
  }
    await modifyProduct(product)
    res.sendStatus(200)
    next()
}

const deleteProduct = async (req, res, next) => {
  const { id } = req.params
    const deleted = await removeProduct(id)
    res.status(200).json(deleted)
    next()
}

module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
}