const { fetchUsersDb, fetchUserByIdDb, fetchUserByEmailDb, fetchUserByFacebookIdDb, createUserDb, modifyUserDb, removeUserDb } = require('../db')

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

const fetchUserByEmail = async (email) => {
  try {
    return await fetchUserByEmailDb(email)
  } catch(e) {
    throw new Error(e.message)
  }
}

const fetchUserByFacebookId = async (id) => {
  try {
    return await fetchUserByFacebookIdDb(id)
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

const modifyUser = async (id) => {
  try {
    return await modifyUserDb(id)
  } catch(e) {
    throw new Error(e.message)
  }
}

const removeUser = async (id) => {
  try {
    return await removeUserDb(id)
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  fetchAllUsers,
  fetchUserById,
  fetchUserByFacebookIdDb,
  fetchUserByEmail,
  createUser,
  modifyUser,
  removeUser
}