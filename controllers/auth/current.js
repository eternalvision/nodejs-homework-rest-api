const { sendSuccessRes } = require('../../utils')

const current = async (req, res) => {
  const { email, subscription } = req.user

  sendSuccessRes(res, { email, subscription })
}

module.exports = current
