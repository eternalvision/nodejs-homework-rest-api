//? библиотека для генерации ошибок
const createError = require("http-errors");

const contactsOperations = require("../../model/contacts");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.updateById(id, req.body);
  if (!result) {
    throw createError(404, `Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateById;
