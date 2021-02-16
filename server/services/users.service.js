const { getUsersDb } = require('../db')

/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const getUsers = async () => {
  try {
    return await getUsersDb()
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  getUsers
}