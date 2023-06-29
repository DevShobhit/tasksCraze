const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id })
        if (user) {
          done(null, user)
        } else {
          const newUser = await User.create({
            name: profile.name.givenName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profilePicture: profile.photos[0].value,
          })
          done(null, newUser)
        }
      } catch (error) {
        console.log(error)
        done(error, null)
      }
    }
  )
)
