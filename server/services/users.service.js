const { fetchUsersDb, fetchUserByIdDb, fetchUserByEmailDb, fetchUserByGoogleIdDb, createUserDb, modifyUserDb, removeUserDb } = require('../db')

const fetchAllUsers = async () => {
    return await fetchUsersDb()
}

const fetchUserById = async (id) => {
    return await fetchUserByIdDb(id)
}

const fetchUserByEmail = async (email) => {
    return await fetchUserByEmailDb(email)
}

const fetchUserByGoogleId = async (id) => {
    return await fetchUserByGoogleIdDb(id)
}

const createUser = async (user) => {
    return await createUserDb(user)
}

const modifyUser = async (id) => {
    return await modifyUserDb(id)
}

const removeUser = async (id) => {
    return await removeUserDb(id)
}

module.exports = {
  fetchAllUsers,
  fetchUserById,
  fetchUserByGoogleId,
  fetchUserByEmail,
  createUser,
  modifyUser,
  removeUser
}