const { fetchUsersDb, fetchUserByIdDb, fetchUserByEmailDb, fetchUserByGoogleIdDb, createUserDb, modifyUserDb, removeUserDb, addGoogleIdUserDb } = require('../db')

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

const modifyUser = async (user) => {
    return await modifyUserDb(user)
}

const removeUser = async (id) => {
    return await removeUserDb(id)
}

const addGoogleIdUser = async (user) => {
    return await addGoogleIdUserDb(user)
}

module.exports = {
  fetchAllUsers,
  fetchUserById,
  fetchUserByGoogleId,
  fetchUserByEmail,
  createUser,
  modifyUser,
  removeUser,
  addGoogleIdUser
}