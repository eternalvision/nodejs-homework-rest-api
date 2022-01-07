//? библиотека для генерации ошибок
const createError = require("http-errors");

const contactsOperations = require("../../model/contacts");

const getContactById = async (req, res) => {
  //? найти по id
  const { id } = req.params;
  const result = await contactsOperations.getContactById(id);

  //? проверка на существование id
  if (!result) {
    // const error = new Error(`Contact with id=${id} not found`);
    // error.status = 404;
    // throw error;

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

module.exports = getContactById;
