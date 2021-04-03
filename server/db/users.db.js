const {pool} = require('../config')

const fetchUsersDb = async () => {
    const res = await pool.query(
      `SELECT users.id, email, first_name, last_name, address1, address2, postcode, city, country, date_joined, active,
      user_role, carts.id AS cart_id FROM users INNER JOIN carts ON users.id = carts.user_id`)
    return res.rows
}

const fetchUserByIdDb = async (id) => {
    const res = await pool.query(
      `SELECT users.id, email, first_name, last_name, address1, address2, postcode, city, country,
       carts.id AS cart_id FROM users INNER JOIN carts ON users.id = carts.user_id WHERE users.id = $1`
      , [id])
    return res.rows[0]
}

const fetchUserByEmailDb = async (email) => {
    const res = await pool.query(`SELECT users.id, email, carts.id AS cart_id, pwd_hash, user_role, active
                                  FROM users INNER JOIN carts ON users.id = carts.user_id WHERE email = $1 AND active = true`, [email])
    return res.rows[0]
}

const fetchUserByGoogleIdDb = async (id) => {
    const res = await pool.query(`SELECT users.id, email, carts.id AS cart_id, pwd_hash, user_role
                                  FROM users INNER JOIN carts ON users.id = carts.user_id WHERE google_id = $1`, [id])
    return res.rows[0]
}


const createUserDb = async ({email, google_id, first_name, last_name, address1, address2, postcode, city,  country, pwd_hash, user_role}) => {
  const text = `INSERT INTO users(email, google_id, first_name, last_name, address1, address2, postcode, city, country, pwd_hash, user_role)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`
  const values = [email, google_id, first_name, last_name, address1, address2, postcode, city, country, pwd_hash, user_role]
  
    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows[0]
}

const modifyUserDb = async ({id, email, first_name, last_name, address1, address2, postcode, city,  country}) => {
  const text = `UPDATE users SET email=$2, first_name=$3, last_name=$4, address1=$5, address2=$6, postcode=$7, city=$8, country=$9
  WHERE id = $1 RETURNING *`
  const values = [id, email, first_name, last_name, address1, address2, postcode, city,  country]

    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows[0]
}

const addGoogleIdUserDb = async({id, google_id}) => {
  const text = `UPDATE users SET google_id = $2 WHERE id = $1 RETURNING *`;
  const values = [id, google_id]
  const res = await pool.query(text, values)
  console.log(res.rows[0])
  return res.rows[0]
}

//Keep user record in db for record-keeping but set active = false
const removeUserDb = async (id) => {
    const res = await pool.query('UPDATE users SET active = false WHERE id = $1', [id])
    return res.rows
}

module.exports = {
  fetchUsersDb,
  fetchUserByIdDb,
  fetchUserByEmailDb,
  fetchUserByGoogleIdDb,
  createUserDb,
  modifyUserDb,
  removeUserDb,
  addGoogleIdUserDb
}