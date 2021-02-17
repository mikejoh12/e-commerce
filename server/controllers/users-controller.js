const { usersService } = require('../services')
const { fetchAllUsers, fetchUserById, createUser, modifyUser, removeUser } = usersService

const getAllUsers = async (req, res, next) => {
  try {
    const users = await fetchAllUsers()
    res.status(200).json(users)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const getUserById = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await fetchUserById(id)
    res.status(200).json(user)
    next()
  } catch(e)  {
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
    user_role
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

//putUser can update all user-info except id, date_joined and pwd_hash
const putUser = async (req, res, next) => {
  const { id } = req.params
  const { email, first_name, last_name, address1, address2, postcode, city, country, active, user_role } = req.body
  const user = {
    id,
    email,
    first_name,
    last_name,
    address1,
    address2,
    postcode,
    city,
    country,
    active,
    user_role
  }
  try {
    await modifyUser(user)
    res.sendStatus(200)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const deleted = await removeUser(id)
    res.status(200).json(deleted)
    next()
  } catch(e)  {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
    getAllUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser
}