const { NotFound } = require('http-errors')
const { User } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const verify = async (req, res, next) => {
  const { verificationToken } = req.params

  const result = await User.findOneAndUpdate(
    { verificationToken }, { verificationToken: false, verify: true })

  if (!result) {
    return next(new NotFound('User not found'))
  }

  sendSuccessRes(res, { message: 'Verification successful' })
}

module.exports = verify
