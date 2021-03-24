const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const usersService = require('../services/users.service')
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { createUser } = usersService

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

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/api/auth/facebook/callback",
  profileFields: ['id', 'email']
},
async (accessToken, refreshToken, profile, done) => {
  /*
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  })*/
  console.log('Accessing facebook passport config function')
  return done(null, profile)
  /*
  try {
    const user = await usersService.fetchUserByFacebookId(profile.id)
    if (!user) {
      //Create user
      const user = {
        email: profile.email,
        facebook_id: profile.id,
        first_name: 'test',
        last_name: 'test',
        address1: 'test',
        address2,
        postcode: 'test',
        city: 'test',
        country,
        pwd_hash: 'test',
        user_role: "customer"
      }        
      const newUser = await createUser(user)
      const newCart = await createCart(newUser.id)
      return done(null, profile)
    } else if (user) {
      return done(null, profile)
    }
  } catch (error) {
    return done(error)
  }
  */
}))

//Checks the A_JWT cookie
passport.use(
    'jwt-customer',
    new JWTstrategy(
      {
        secretOrKey: process.env.JWT_KEY,
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
        secretOrKey: process.env.JWT_KEY,
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