const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const crypto = require('crypto')
const { User } = require('../../models')
const { sendSuccessRes } = require('../../utils')
const { sendMail } = require('../../utils')

const signup = async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user) {
    return next(new Conflict('Email in use'))
  }

  const avatarURL = gravatar.url(email, { protocol: 'https', s: '250' })
  const verificationToken = crypto.randomUUID()

  const newUser = new User({ email, avatarURL, verificationToken })

  newUser.setPassword(password)

  await newUser.save()

  const mail = {
    to: email,
    subject: 'Verification registration',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">
    Click to link for verification your email</a>`
  }

  await sendMail(mail)

  const ResponseBody = { user: { email, subscription: 'starter', avatarURL } }

  sendSuccessRes(res, ResponseBody, 201)
}

module.exports = signup
