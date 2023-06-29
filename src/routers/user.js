const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const passport = require('passport')
const auth = require('../middlewares/auth')

router.get('/api/getuser', auth, (req, res) => {
  userController.getUser(req, res)
})

router.post(
  '/api/auth/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect('/')
  }
)

router.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    req.session.userID = req.user._id
    res.redirect('/')
  }
)

router.post('/api/auth/signup', (req, res) => {
  userController.signup(req, res)
})

router.get('/api/auth/logout', auth, (req, res) => {
  req.logOut()
  res.redirect('/')
  // req.session.destroy(function () {
  //   res.clearCookie('connect.sid')
  //   res.redirect('https://accounts.google.com/Logout')
  //   res.redirect('/')
  // })
  // req.logout(function (err) {
  //   if (err) {
  //     return next(err)
  //   }
  //   res.status(200).send('Logged Out')
  // })
})

module.exports = router
