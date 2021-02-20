const bcrypt = require('bcrypt')

const getPwdHash = async (pwd) => {
    try {
      const hash = await bcrypt.hash(pwd, 10)
      return(hash) 
    } catch(e) {
      throw new Error(e.message)
    }
}

module.exports = {
    getPwdHash
}