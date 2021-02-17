const { productsService } = require('../services')

const { fetchProducts, fetchProductById, createProduct } = productsService

const getAllProducts = async (req, res, next) => {
    try {
      const products = await fetchProducts()
      res.status(200).json(products)
      next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) && next(e)
    }
  }

const getProductById = async (req, res, next) => {
  const { id } = req.params
  try {
    const product = await fetchProductById(id)
    res.status(200).json(product)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const postProduct = async (req, res, next) => {
  const { name, price, description, category, image_url, status } = req.body
  const product = {
    name,
    price,
    description,
    category,
    image_url,
    status
  }
  try {
    await createProduct(product)
    res.sendStatus(201)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
    getAllProducts,
    getProductById,
    postProduct
}