const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const codeRegexPass =
  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{7,}/

/**
   * Explanation:

(?=.*[0-9]) - the string contains at least one number;
(?=.*[!@#$%^&*]) - the string contains at least one special symbol;
(?=.*[a-z]) - the string contains at least one lowercase latin letter;
(?=.*[A-Z]) - the string contains at least one uppercase latin letter;
[0-9a-zA-Z!@#$%^&*]{7,} - the string consists of at least 7 of the above characters.
   */

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'missing required field password'],
      math: codeRegexPass,
    },
    email: {
      type: String,
      required: [true, 'missing required field email'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const userJoiShema = (contact, requireFields = []) => {
  let validateContact = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().pattern(codeRegexPass, 'password'),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
  })

  validateContact = validateContact.fork(requireFields, (field) =>
    field.required()
  )

  return validateContact.validate(contact)
}

const User = model('user', userSchema)

module.exports = {
  User,
  userJoiShema
}
