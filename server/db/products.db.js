const {pool} = require('../config')

const fetchProductsDb = async () => {
    const res = await pool.query('SELECT * FROM products')
    return res.rows
}
  
const fetchProductByIdDb = async (id) => {
    const res = await pool.query('SELECT * FROM products WHERE id = $1', [id])
    return res.rows
}

const createProductDb = async ({ name, price, description, category, image_url, status }) => {
  const text = `INSERT INTO products(name, price, description, category, image_url, status)
                VALUES($1, $2, $3, $4, $5, $6) RETURNING *`
  const values = [name, price, description, category, image_url, status]

    const res = await pool.query(text, values)
    return res.rows
}

const modifyProductDb = async ({ id, name, price, description, category, image_url, status }) => {
  const text = `UPDATE products SET name=$2, price=$3, description=$4, category=$5, image_url=$6, status=$7
    WHERE id = $1 RETURNING *`
  const values = [id, name, price, description, category, image_url, status]

    const res = await pool.query(text, values)
    return res.rows
}

const removeProductDb = async (id) => {
    const res = await pool.query('DELETE FROM products WHERE id = $1', [id])
    return res.rows
}

  module.exports = {
    fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb
  }