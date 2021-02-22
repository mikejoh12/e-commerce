const { authService, usersService } = require('../services')
const { getPwdHash } = authService
const { createUser } = usersService
const passport = require('passport')
const jwt = require('jsonwebtoken')

const signupUser = async (req, res, next) => {
    const { email, password, first_name, last_name, address1, address2, postcode, city, country } = req.body
    try {
      const pwd_hash = await getPwdHash(password)
      console.log(pwd_hash)
      const user = {
        email,
        first_name,
        last_name,
        address1,
        address2,
        postcode,
        city,
        country,
        pwd_hash,
        user_role: "customer"
      }        
      await createUser(user)
      res.status(201).send(`You signed up successfully.`)
      next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500)
    }
}

const loginUser = async (req, res, next) => {
  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred.');
          return next(error);
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const body = { id: user.id, email: user.email, role: user.user_role};
            const token = jwt.sign({ user: body }, 'TOP_SECRET');
            res.cookie('A_JWT', token, {
              maxAge: 60 * 60 * 1000, // 1 hour
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production'? true: false,
              sameSite: true, //Change if hosting client site with different provider
            })
            
            return res.status(200).send(`Login successful. Token: ${token}`);
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}

module.exports = {
    signupUser,
    loginUser
}