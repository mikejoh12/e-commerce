const {pool} = require('../config')

const getOrdersDb = () => {
    /*
     * put code to call database here
     * this can be either an ORM model or code to call the database through a driver or querybuilder
     * i.e.-
      INSERT INTO blogposts (user_name, blogpost_body)
      VALUES (user, content);
    */
    return ['Order1', 'Order2'] //just a dummy return as we aren't calling db right now
  }
  
  module.exports = {
    getOrdersDb
  }