const { Schema, model } = require('mongoose')
const Joi = require('joi')

const codeRegexName =
  /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/

const codeRegexPhone =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/

const contactSchema = Schema(
  {
    name: {
      type: String,
      match: codeRegexName,
      require: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      match: codeRegexPhone,
      require: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
)

const contactsJoiSchema = (contact, requireFields = []) => {
  let validateContact = Joi.object({
    name: Joi.string().max(30).pattern(codeRegexName, 'name'),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string().max(15).pattern(codeRegexPhone, 'phone'),
    favorite: Joi.boolean(),
  })

  validateContact = validateContact.fork(requireFields, (field) => field.required())

  return validateContact.validate(contact)
}

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  contactsJoiSchema
}
