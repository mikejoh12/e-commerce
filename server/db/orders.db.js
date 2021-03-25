const {pool} = require('../config')

const fetchOrdersDb = async () => {
    const res = await pool.query('SELECT * FROM orders')
    return res.rows
}

const fetchOrderByIdDb = async (orderId) => {
    const res = await pool.query(
      ` SELECT * FROM orders
        INNER JOIN order_products ON orders.id = order_products.order_id
        INNER JOIN products ON order_products.product_id = products.id
        WHERE orders.id = $1`, [orderId])
    return res.rows
}

//Fetches the order history for one user
const fetchOrdersByUserDb = async (userId) => {
  const text = `SELECT orders.id AS order_id, products.id AS product_id, products.name, products.price, quantity, orders.created_at FROM orders
                INNER JOIN order_products ON orders.id = order_products.order_id
                INNER JOIN products ON order_products.product_id = products.id
                WHERE user_id = $1`
  values = [userId]

    const res = await pool.query(text, values)
    return res.rows
}

//Create an empty order for a customer
const createOrderDb = async ({user_id, status}) => {
  const text =  `INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *`
  const values = [user_id, status]

    const res = await pool.query(text, values)
    return res.rows[0].id
}

//Add one product to an order
const createProductInOrderDb = async ({order_id, product_id, quantity, price}) => {
  const text = `INSERT INTO order_products (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *`
  const values = [order_id, product_id, quantity, price]

    const res = await pool.query(text, values)
    return res.rows
}

module.exports = {
    fetchOrdersDb, fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb
}