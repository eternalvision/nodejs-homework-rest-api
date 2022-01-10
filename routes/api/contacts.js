const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

//TODO Вывод всех
router.get("/", ctrlWrapper(ctrl.listContacts));

//TODO Вывод одного
router.get("/:id", ctrlWrapper(ctrl.getContactById));

//TODO Добавление
router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact));

//TODO Обновление
router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById));

//TODO Обновление PATCH
router.patch("/:id/favorite", validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateStatusContact));

//TODO Удаление
router.delete("/:id", ctrlWrapper(ctrl.removeContact));

module.exports = router;
