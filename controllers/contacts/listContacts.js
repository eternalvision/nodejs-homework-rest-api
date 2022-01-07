const contactsOperations = require("../../model/contacts");

//TODO Вывод всех
const listContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  //   res.json(contacts);
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
