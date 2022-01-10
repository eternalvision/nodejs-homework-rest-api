const { Schema, model } = require("mongoose");
const Joi = require("Joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool(),
});

const Contact = model("product", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};
