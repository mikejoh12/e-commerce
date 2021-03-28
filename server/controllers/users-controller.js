const { usersService, cartsService } = require('../services')
const { fetchAllUsers, fetchUserById, modifyUser, removeUser } = usersService
const { removeCart, fetchCartById } = cartsService

const getAllUsers = async (req, res, next) => {
    const users = await fetchAllUsers()
    res.status(200).json({users: users})
    next()
}

const getUserSelf = async (req, res, next) => {
  const id = req.user.id //Extract id from passport user object
    const user = await fetchUserById(id)
    res.status(200).json(user)
    next()
}

//putUserSelf updates most fields of self
const putUserSelf = async (req, res, next) => {
  const id = req.user.id //Extract self user id from passport user object
  const { email, first_name, last_name, address1, address2, postcode, city, country } = req.body
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
  }
    await modifyUser(user)
    res.sendStatus(200)
    next()
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params 
    const cart = await fetchCartById(id)
    const user = await fetchUserById(id)
    if (cart.length || !user) {
      const error = new Error('Incorrect user or cart not empty');
      return next(error);
    }
    await removeCart(id)
    await removeUser(id)
    res.status(200).json({msg: 'User and cart deleted'})
    next()
}

module.exports = {
    getAllUsers,
    getUserSelf,
    putUserSelf,
    deleteUser
}