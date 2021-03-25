const {pool} = require('../config')

//Fetches all products in all carts
const fetchCartsDb = async () => {

    const res = await pool.query(
      ` SELECT * FROM carts
        INNER JOIN cart_products ON carts.id = cart_products.cart_id
        INNER JOIN products ON cart_products.product_id = products.id`)
    return res.rows
}

//Fetches all products in a cart for a userId
const fetchCartByIdDb = async (userId) => {

    const res = await pool.query(
      ` SELECT products.id, name, price, description, category, image_url, status, quantity FROM carts
        INNER JOIN cart_products ON carts.id = cart_products.cart_id
        INNER JOIN products ON cart_products.product_id = products.id
        WHERE user_id = $1`, [userId])
    return res.rows
}

//Creates a record in the carts table for a userId with 1-1 relation
const createCartDb = async (userId) => {
  const text = `INSERT INTO carts(user_id)
                VALUES($1) RETURNING id`
  const values = [userId]

    const res = await pool.query(text, values)
    return res.rows[0]
}

//Adds a new product of a given quantity to a cart
const createProductInCartDb = async ({cart_id, product_id, quantity}) => {
  const text = `INSERT INTO cart_products (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`
  const values = [cart_id, product_id, quantity]

    const res = await pool.query(text, values)
    return res.rows
}

//Modifies one quantity of a product in a cart for a given cart_id and product_id
const modifyCartDb = async ({cart_id, product_id, quantity}) => {
  const text = `UPDATE cart_products
                SET quantity = $3
                WHERE cart_id = $1 AND product_id = $2 RETURNING *`
  const values = [cart_id, product_id, quantity]

    const res = await pool.query(text, values)
    return res.rows[0]
}

//Removes a product from a cart
const removeCartProductDb = async ({cart_id, product_id}) => {
    const res = await pool.query('DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id])
    return res.rows[0]
}

//Removes a cart (needs to be empty)
const removeCartDb = async (userId) => {
    const res = await pool.query('DELETE FROM carts WHERE user_id = $1', [userId])
    return res.rows[0]
}

module.exports = {
  fetchCartsDb, fetchCartByIdDb, createCartDb, createCartDb, createProductInCartDb, modifyCartDb, removeCartProductDb, removeCartDb
}