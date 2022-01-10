const { BadRequest } = require('http-errors')
const { sendSuccessRes, sendMail } = require('../../utils')
const { User } = require('../../models')

const reVerify = async (req, res, next) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (user.verify) {
    return next(new BadRequest('Verification has already been passed'))
  }

  const mail = {
    to: email,
    subject: 'Verification registration',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">
    Click to link for verification your email</a>`,
  }

  await sendMail(mail)

  sendSuccessRes(res, { message: 'Verification email sent' })
}

module.exports = reVerify
