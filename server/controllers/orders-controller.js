const { ordersService } = require('../services')

const { fetchOrders, fetchOrderById, fetchOrdersByUser, createOrder, createProductInOrder } = ordersService

const getAllOrders = async (req, res, next) => {
      const orders = await fetchOrders()
      res.status(200).json(orders)
      next()
  }

const getOrderById = async (req, res, next) => {
  const { orderId } = req.params
  const order = await fetchOrderById(orderId)
  res.status(200).json(order)
  next()
}

const getOrdersSelf = async (req, res, next) => {
  const userId = req.user.id
  const orders = await fetchOrdersByUser(userId)
  res.status(200).json(orders)
  next()
}

module.exports = {
    getAllOrders, getOrderById, getOrdersSelf
}