const {pool} = require('../config')

const fetchOrdersDb = async () => {
  try {
    const res = await pool.query('SELECT * FROM orders')
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

const fetchOrderByIdDb = async (orderId) => {
  try {
    const res = await pool.query(
      ` SELECT * FROM orders
        INNER JOIN order_products ON orders.id = order_products.order_id
        INNER JOIN products ON order_products.product_id = products.id
        WHERE orders.id = $1`, [orderId])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

//Fetches the order history for one user
const fetchOrdersByUserDb = async (userId) => {
  try {
    const res = await pool.query(
      ` SELECT * FROM orders
        INNER JOIN order_products ON orders.id = order_products.order_id
        INNER JOIN products ON order_products.product_id = products.id
        INNER JOIN users ON users.id = orders.user_id
        WHERE users.id = $1`, [userId])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

//Create an empty order for a customer
const createOrderDb = async (userId) => {
  const text =  `INSERT INTO orders (user_id) VALUES($1) RETURNING *`
  const values = [userId]
  try {
    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

//Add one product to an order
const createProductInOrderDb = async ({order_id, product_id, quantity, price}) => {
  const text = `INSERT INTO order_products (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *`
  const values = [order_id, product_id, quantity, price]
  try {
    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

module.exports = {
    fetchOrdersDb, fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb
}