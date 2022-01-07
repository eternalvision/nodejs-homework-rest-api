//? библиотека для проверки приходящих данных при добавлении их
const Joi = require("joi");

const conatactSchema = Joi.object({
  name: Joi.string().min(5).max(15).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = conatactSchema;
