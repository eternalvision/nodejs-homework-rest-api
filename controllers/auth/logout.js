const { User } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const logout = async (req, res) => {
  const { _id } = req.user
  const reset = { token: null }

  await User.findByIdAndUpdate(_id, reset)

  sendSuccessRes(res, '', 204)
}

module.exports = logout
