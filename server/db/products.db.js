const {pool} = require('../config')

const getProductsDb = async () => {
   try {
    const res = await pool.query('SELECT * FROM products')
    return res.rows
    } catch (err) {
    console.log(err.stack)
  }
}
  
  module.exports = {
    getProductsDb
  }