const { NotFound } = require('http-errors')
const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const { _id } = req.user

  const result = await Contact.findOneAndUpdate({ owner: _id, _id: contactId }, req.body,
    { new: true })
    .populate('owner', '_id email')

  if (!result) {
    return next(new NotFound(`Contact with id=${contactId} not found`))
  }

  sendSuccessRes(res, { result })
}

module.exports = updateContact
