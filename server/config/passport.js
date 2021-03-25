const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { cartsService, usersService } = require('../services')
const { fetchUserByGoogleId, createUser } = usersService
const { createCart } = cartsService

passport.use(
    'login',
    new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        const user = await usersService.fetchUserByEmail(email);
        if (!user) {
        return done(null, false, { message: 'User not found' });
        }
        const match = await bcrypt.compare(password, user.pwd_hash)

        if (!match) {
        return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
}))

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/redirect",
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("Access token: ", accessToken)
    console.log("Google id: ", profile.id)
    //Use first email for now
    console.log("Email: ", profile.emails[0].value)

    const googleUser = await fetchUserByGoogleId(profile.id)
    if(googleUser) {
      console.log('User exists in db')
      return done(null, googleUser, { message: 'User found' });
    } else {
      console.log('User does not exist. Creating user in db.')
      const user = {
        email: profile.emails[0].value,
        google_id: profile.id,
        user_role: "customer"
      }        
      const newUser = await createUser(user)
      const newCart = await createCart(newUser.id)
      return done(null, newUser, { message: 'New user created' });
    }
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