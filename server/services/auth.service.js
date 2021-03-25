const bcrypt = require('bcrypt')

const getPwdHash = async (pwd) => {
      const hash = await bcrypt.hash(pwd, 10)
      return(hash) 
}

module.exports = {
    getPwdHash
}