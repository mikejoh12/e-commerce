const { ordersService } = require('../services')

const { fetchOrders, fetchOrderById, fetchOrdersByUser, createOrder, createProductInOrder } = ordersService

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

const getOrdersByUser = async (req, res, next) => {
  const { userId } = req.params
  try {
    const orders = await fetchOrdersByUser(userId)
    res.status(200).json(orders)
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

const postProductInOrder = async (req, res, next) => {
  const { orderId } = req.params
  const { product_id, quantity, price } = req.body
  const orderProduct = {
    order_id: orderId,
    product_id,
    quantity,
    price
  }
  try {
    await createProductInOrder(orderProduct)
    res.sendStatus(201)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
    getAllOrders, getOrderById, getOrdersByUser, postOrder, postProductInOrder
}