const createError = require("http-errors");

const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
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
