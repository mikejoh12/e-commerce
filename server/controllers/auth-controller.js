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
      res.status(201).send(`You signed up. Hash: ${pwd_hash}`)
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

            return res.json({ token });
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