const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const updateSubscriptionUser = require('./updateSubscriptionUser')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const reVerify = require('./reVerify')

module.exports = {
  signup,
  login,
  logout,
  current,
  updateSubscriptionUser,
  updateAvatar,
  verify,
  reVerify
}
