const { Contact } = require('../../models')
const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../../utils')

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const { _id } = req.user

  const result = await Contact.findOne({ owner: _id, _id: contactId })
    .populate('owner', '_id email')

  if (!result) {
    return next(new NotFound(`Contact with id=${contactId} not found`))
  }

  sendSuccessRes(res, { result })
}

module.exports = getContactById
