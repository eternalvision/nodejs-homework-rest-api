const { BadRequest } = require('http-errors')
const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const listContacts = async (req, res, next) => {
  const { _id } = req.user
  const { page = 0, limit = 20, favorite } = req.query

  const skip = page > 0 ? (page - 1) * limit : 0
  const findBy = { owner: _id }
  const requestedFields = '_id name email phone favorite owner'
  const pagination = { skip, limit: Number(limit) }

  if (isNaN(page) || isNaN(limit)) {
    return next(BadRequest())
  }

  if (favorite) {
    findBy.favorite = favorite
  }

  const result = await Contact.find(findBy, requestedFields, pagination)
    .populate('owner', '_id email')

  sendSuccessRes(res, { result })
}

module.exports = listContacts
