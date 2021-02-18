const {pool} = require('../config')

const fetchCartsDb = async () => {
  try {
    const res = await pool.query('SELECT * FROM carts')
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

const fetchCartByIdDb = async (userId) => {
  try {
    const res = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

const createCartDb = async (userId) => {
  const text = `INSERT INTO carts(user_id)
                VALUES($1) RETURNING *`
  const values = [userId]
  try {
    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

// TO DO - Join with products table
const modifyCartDb = async (userId) => {
  const text = `SELECT * FROM carts WHERE user_id = $1`
  const values = [userId]
  try {
    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

const removeCartDb = async (userId) => {
  try {
    const res = await pool.query('DELETE FROM carts WHERE user_id = $1', [userId])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}


module.exports = {
  fetchCartsDb, fetchCartByIdDb, createCartDb, modifyCartDb, removeCartDb
}