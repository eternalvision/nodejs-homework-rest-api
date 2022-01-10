const { User } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const updateSubscriptionUser = async (req, res) => {
  const { _id, email } = req.user
  const { subscription } = req.body

  await User.findByIdAndUpdate(_id, { subscription })

  sendSuccessRes(res, { email, subscription })
}

module.exports = updateSubscriptionUser
