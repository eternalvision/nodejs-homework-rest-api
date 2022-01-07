const createError = require("http-errors");

const contactsOperations = require("../../model/contacts");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.removeContact(id);
  if (!result) {
    throw createError(404, `Product with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeContact;
