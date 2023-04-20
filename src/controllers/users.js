const User = require('../models/user')

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID })
    res.status(200).json({ user: user })
  } catch (e) {
    res.status(500).send()
  }
}

module.exports = { getUser }
