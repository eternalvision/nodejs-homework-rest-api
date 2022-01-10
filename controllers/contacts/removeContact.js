const { NotFound } = require('http-errors')
const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const { _id } = req.user

  const result = await Contact.findOneAndRemove({ owner: _id, _id: contactId })
    .populate('owner', '_id email')

  if (!result) {
    return next(new NotFound(`Contact with id=${contactId} not found`))
  }

  const { owner } = result

  sendSuccessRes(res, { message: 'contact deleted', delete_id: contactId, owner })
}

module.exports = removeContact
