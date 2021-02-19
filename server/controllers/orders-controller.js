const { ordersService } = require('../services')

const { fetchOrders, fetchOrderById, createOrder } = ordersService

/*
 * call other imported services, or same service but different functions here if you need to
*/
const getAllOrders = async (req, res, next) => {
    try {
      const orders = await fetchOrders()
      // other service call (or same service, different function can go here)
      // i.e. - await generateBlogpostPreview()
      res.status(200).json(orders)
      next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) && next(e)
    }
  }

const getOrderById = async (req, res, next) => {
  const { orderId } = req.params
  try {
    const product = await fetchOrderById(orderId)
    res.status(200).json(product)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const postOrder = async (req, res, next) => {
  const { userId } = req.params
  try {
    const orderNr = await createOrder(userId)
    res.status(201).json(orderNr)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
    getAllOrders, getOrderById, postOrder
}