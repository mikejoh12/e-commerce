const {pool} = require('../config')

const getUsersDb = async () => {
  try {
    const res = await pool.query('SELECT * FROM users')
    return res.rows
  } catch (err) {
    console.log(err.stack)
  }
}
  
module.exports = {
  getUsersDb
}