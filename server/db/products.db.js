const {pool} = require('../config')

const fetchProductsDb = async () => {
   try {
    const res = await pool.query('SELECT * FROM products')
    return res.rows
    } catch (err) {
    console.log(err.stack)
  }
}
  
const fetchProductByIdDb = async (id) => {
  try {
    const res = await pool.query('SELECT * FROM products WHERE id = $1', [id])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}
  module.exports = {
    fetchProductsDb, fetchProductByIdDb
  }