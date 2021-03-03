const {pool} = require('../config')

//Fetches all products in all carts
const fetchCartsDb = async () => {
  try {
    const res = await pool.query(
      ` SELECT * FROM carts
        INNER JOIN cart_products ON carts.id = cart_products.cart_id
        INNER JOIN products ON cart_products.product_id = products.id`)
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

//Fetches all products in a cart for a userId
const fetchCartByIdDb = async (userId) => {
  try {
    const res = await pool.query(
      ` SELECT products.id, name, price, description, category, image_url, status, quantity FROM carts
        INNER JOIN cart_products ON carts.id = cart_products.cart_id
        INNER JOIN products ON cart_products.product_id = products.id
        WHERE user_id = $1`, [userId])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

//Creates a record in the carts table for a userId with 1-1 relation
const createCartDb = async (userId) => {
  const text = `INSERT INTO carts(user_id)
                VALUES($1) RETURNING id`
  const values = [userId]
  try {
    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows[0]
  } catch (err) {
    console.log(err.stack)
  }
}

//Adds a new product of a given quantity to a cart
const createProductInCartDb = async ({cart_id, product_id, quantity}) => {
  const text = `INSERT INTO cart_products (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`
  const values = [cart_id, product_id, quantity]
  try {
    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

//Modifies one quantity of a product in a cart for a given cart_id and product_id
const modifyCartDb = async ({cart_id, product_id, quantity}) => {
  console.log(`Cart id: ${cart_id} Product_id: ${product_id} Qty ${quantity}`)
  const text = `UPDATE cart_products
                SET quantity = $3
                WHERE cart_id = $1 AND product_id = $2 RETURNING *`
  const values = [cart_id, product_id, quantity]
  try {
    const res = await pool.query(text, values)
    return res.rows[0]
  } catch (err) {
    console.log(err.stack)
  }
}

//Removes a product from a cart
const removeCartProductDb = async ({cart_id, product_id}) => {
  try {
    const res = await pool.query('DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id])
    return res.rows[0]
  } catch (err) {
    console.log(err.stack)
  }
}

//Removes a cart (needs to be empty)
const removeCartDb = async (userId) => {
  try {
    const res = await pool.query('DELETE FROM carts WHERE user_id = $1', [userId])
    return res.rows[0]
  } catch (err) {
    console.log(err.stack)
  }
}

module.exports = {
  fetchCartsDb, fetchCartByIdDb, createCartDb, createCartDb, createProductInCartDb, modifyCartDb, removeCartProductDb, removeCartDb
}