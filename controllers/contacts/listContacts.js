const { Contact } = require("../../models");

//TODO Вывод всех
const listContacts = async (req, res) => {
  const contacts = await Contact.find({});
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
