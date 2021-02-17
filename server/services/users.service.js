const { fetchUsersDb, fetchUserByIdDb, createUserDb, modifyUserDb, removeUserDb } = require('../db')

/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const fetchAllUsers = async () => {
  try {
    return await fetchUsersDb()
  } catch(e) {
    throw new Error(e.message)
  }
}

const fetchUserById = async (id) => {
  try {
    return await fetchUserByIdDb(id)
  } catch(e) {
    throw new Error(e.message)
  }
}

const createUser = async (user) => {
  try {
    return await createUserDb(user)
  } catch(e) {
    throw new Error(e.message)
  }
}

const modifyUser = async (user) => {
  try {
    return await modifyUserDb(user)
  } catch(e) {
    throw new Error(e.message)
  }
}

const removeUser = async (user) => {
  try {
    return await removeUserDb(user)
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  fetchAllUsers,
  fetchUserById,
  createUser,
  modifyUser,
  removeUser
}