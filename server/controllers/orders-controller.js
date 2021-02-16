const { ordersService } = require('../services')

const { getOrders } = ordersService

/*
 * call other imported services, or same service but different functions here if you need to
*/
const getAllOrders = async (req, res, next) => {
    try {
      const orders = await getOrders()
      // other service call (or same service, different function can go here)
      // i.e. - await generateBlogpostPreview()
      res.status(200).json(orders)
      next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) && next(e)
    }
  }

module.exports = {
    getAllOrders
}