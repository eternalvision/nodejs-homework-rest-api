const { BadRequest } = require('http-errors')

const validation = (joiSchema, requireFields = []) => {
  return async (req, _, next) => {
    const { error } = joiSchema(req.body, requireFields)

    if (error) {
      return next(new BadRequest(error.message))
    }
    next()
  }
}

module.exports = validation
