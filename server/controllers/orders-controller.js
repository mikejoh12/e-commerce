const { ordersService } = require('../services')

const { fetchOrders, fetchOrderById, fetchOrdersByUser, createOrder, createProductInOrder } = ordersService

const getAllOrders = async (req, res, next) => {
    try {
      const orders = await fetchOrders()
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

const getOrdersSelf = async (req, res, next) => {
  const userId = req.user.id
  try {
    const orders = await fetchOrdersByUser(userId)
    res.status(200).json({orders: orders})
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
    getAllOrders, getOrderById, getOrdersSelf
}