const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../helpers");
const { Contact } = require("../models");

const getAll = async (req, res) => {
  const data = await Contact.find({}, "name favorite phone email");
  sendSuccessRes(res, { data });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId, "name favorite phone email");
  if (!data) {
    throw new NotFound(`id=${contactId} Not Found`);
  }
  sendSuccessRes(res, data);
};

const add = async (req, res) => {
  const data = await Contact.create(req.body);
  sendSuccessRes(res, data, 201);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessRes(res, { result });
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} Not Found`);
  }
  sendSuccessRes(res, { message: "contact deleted" });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessRes(res, { result });
};

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateStatusContact,
};
