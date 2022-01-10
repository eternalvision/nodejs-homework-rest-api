const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { User } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  const avatarURL = gravatar.url(email, { protocol: 'https', s: '250' })

  if (user) {
    return next(new Conflict('Email in use'))
  }
  const newUser = new User({ email, avatarURL })

  newUser.setPassword(password)

  await newUser.save()

  const ResponseBody = { user: { email, subscription: 'starter', avatarURL } }

  sendSuccessRes(res, ResponseBody, 201)
}

module.exports = signup
