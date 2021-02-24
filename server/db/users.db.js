const {pool} = require('../config')

const fetchUsersDb = async () => {
  try {
    const res = await pool.query(
      'SELECT id, email, first_name, last_name, address1, address2, postcode, city, country, date_joined, active, user_role FROM users')
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

const fetchUserByIdDb = async (id) => {
  try {
    const res = await pool.query(
      'SELECT id, email, first_name, last_name, address1, address2, postcode, city, country FROM users WHERE id = $1'
      ,[id])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

const fetchUserByEmailDb = async (email) => {
  try {
    const res = await pool.query(`SELECT users.id, email, carts.id AS cart_id, pwd_hash, user_role
                                  FROM users INNER JOIN carts ON users.id = carts.user_id WHERE email = $1`, [email])
    return res.rows[0]
  } catch (err) {
    console.log(err.stack)
  }
}

const createUserDb = async ({email, first_name, last_name, address1, address2, postcode, city,  country, pwd_hash, user_role}) => {
  const text = `INSERT INTO users(email, first_name, last_name, address1, address2, postcode, city, country, pwd_hash, user_role)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`
  const values = [email, first_name, last_name, address1, address2, postcode, city, country, pwd_hash, user_role]
  
  try {
    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows[0]
  } catch (err) {
    console.log(err.stack)
  }
}

const modifyUserDb = async ({id, email, first_name, last_name, address1, address2, postcode, city,  country}) => {
  const text = `UPDATE users SET email=$2, first_name=$3, last_name=$4, address1=$5, address2=$6, postcode=$7, city=$8, country=$9
  WHERE id = $1 RETURNING *`
  const values = [id, email, first_name, last_name, address1, address2, postcode, city,  country]
  try {
    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

const removeUserDb = async (id) => {
  try {
    const res = await pool.query('DELETE FROM users WHERE id = $1', [id])
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}

module.exports = {
  fetchUsersDb,
  fetchUserByIdDb,
  fetchUserByEmailDb,
  createUserDb,
  modifyUserDb,
  removeUserDb
}