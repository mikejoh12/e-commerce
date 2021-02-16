const { usersService } = require('../services')

const { getUsers } = usersService

/*
 * call other imported services, or same service but different functions here if you need to
*/
const getAllUsers = async (req, res, next) => {
    try {
      const users = await getUsers()
      // other service call (or same service, different function can go here)
      // i.e. - await generateBlogpostPreview()
      res.status(200).json(users)
      next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) && next(e)
    }
  }

module.exports = {
    getAllUsers
}