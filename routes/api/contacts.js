const express = require("express");

const { validateCreate, validateUpdate, validateId } = require("../../middlewares");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

//TODO Вывод всех
router.get("/", ctrl.listContacts);

//TODO Вывод одного
router.get("/:id", validateId, ctrl.getContactById);

//TODO Добавление
router.post("/", validateCreate, ctrl.addContact);

//TODO Обновление
router.put("/:id", validateId, validateUpdate, ctrl.updateById);

//TODO Удаление
router.delete("/:id", validateId, ctrl.removeContact);
module.exports = router;
