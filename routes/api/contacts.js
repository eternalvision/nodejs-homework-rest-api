const express = require('express')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')
const { contactsJoiSchema } = require('../../models/contact')

const requireFields = ['name', 'email', 'phone']
const requireField = ['favorite']

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.listContacts))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getContactById))

router.post(
  '/',
  authenticate,
  validation(contactsJoiSchema, requireFields), controllerWrapper(ctrl.addContact))

router.put(
  '/:contactId',
  authenticate,
  validation(contactsJoiSchema, requireFields), controllerWrapper(ctrl.updateContact))

router.patch(
  '/:contactId/favorite',
  authenticate,
  validation(contactsJoiSchema, requireField), controllerWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeContact))

module.exports = router
