const { usersService } = require('../services')
const { getUsers, createUser } = usersService

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getUsers()
    res.status(200).json(users)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const postUser = async (req, res, next) => {
  const { email, first_name, last_name, address1, address2, postcode, city, country } = req.body
  const user = {
    email,
    first_name,
    last_name,
    address1,
    address2,
    postcode,
    city,
    country,
    user_role: 'customer'
  }
  try {
    await createUser(user)
    res.sendStatus(201)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
    getAllUsers,
    postUser
}