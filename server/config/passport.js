const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const usersService = require('../services/users.service')
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


passport.use(
    'login',
    new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
    try {
        const user = await usersService.fetchUserByEmail(email);
        console.log(user)
        if (!user) {
        return done(null, false, { message: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.pwd_hash)

        if (!match) {
        return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
        return done(error);
    }
}
))

//Checks the A_JWT cookie
passport.use(
    'jwt-customer',
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromExtractors([
          (req) => {
            let token = null;
            if (req && req.cookies)
            {
                token = req.cookies['A_JWT'];
            }
            return token;
        }])
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //Checks the A_JWT cookie and if a user has user_role = admin
  passport.use(
    'jwt-admin',
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromExtractors([
          (req) => {
            let token = null;
            if (req && req.cookies)
            {
                token = req.cookies['A_JWT'];
            }
            return token;
        }])
      },
      async (token, done) => {
        if (token.user.role !== 'admin') { //Reject if not admin
          return done(null, false)
        }
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );