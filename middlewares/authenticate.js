const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      return next(new Unauthorized('Not authorized'))
    }

    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      return next(new Unauthorized('Not authorized'))
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY)
      const user = await User.findById(id)
      if (!user || !user.token) {
        return next(new Unauthorized('Not authorized'))
      }

      req.user = user

      next()
    } catch (error) {
      return next(new Unauthorized('Not authorized'))
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
