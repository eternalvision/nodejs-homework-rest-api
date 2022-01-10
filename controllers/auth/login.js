const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const { SECRET_KEY } = process.env

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !user.verify || !user.comparePassword(password)) {
    return next(new Unauthorized('Email or password is wrong'))
  }

  const payload = { id: user._id }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' })
  await User.findByIdAndUpdate(user._id, { token })

  const ResponseBody = {
    token,
    user: {
      email,
      subscription: 'starter',
    },
  }

  sendSuccessRes(res, ResponseBody)
}

module.exports = login
