const { cartsService } = require('../services')

const { getCarts } = cartsService

/*
 * call other imported services, or same service but different functions here if you need to
*/
const getAllCarts = async (req, res, next) => {
    try {
      const carts = await getCarts()
      // other service call (or same service, different function can go here)
      // i.e. - await generateBlogpostPreview()
      res.status(200).json(carts)
      next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) && next(e)
    }
  }

module.exports = {
    getAllCarts
}