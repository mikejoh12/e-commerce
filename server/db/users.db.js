const {pool} = require('../config')

const getUsersDb = async () => {
  try {
    const res = await pool.query('SELECT * FROM users')
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

const createUserDb = async (user) => {
  const {
    email, first_name, last_name, address1, address2, postcode, city,  country, user_role 
    } = user
  
  const text = `INSERT INTO users(email, first_name, last_name, address1, address2, postcode, city,  country, user_role)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`
  const values = [email, first_name, last_name, address1, address2, postcode, city,  country, user_role]
  
  try {
    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

module.exports = {
  getUsersDb,
  createUserDb
}