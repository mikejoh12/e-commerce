const { productsService } = require('../services')

const { getProducts } = productsService

/*
 * call other imported services, or same service but different functions here if you need to
*/
const getAllProducts = async (req, res, next) => {
    try {
      const products = await getProducts()
      // other service call (or same service, different function can go here)
      // i.e. - await generateBlogpostPreview()
      res.status(200).json(products)
      next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) && next(e)
    }
  }

module.exports = {
    getAllProducts
}