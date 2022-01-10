const express = require('express')
const { controllerWrapper, validation, authenticate, upload } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const { userJoiShema } = require('../../models/user')

const router = express.Router()

const requireFields = ['email', 'password']
const requireField = ['subscription']

router.post(
  '/signup', validation(userJoiShema, requireFields), controllerWrapper(ctrl.signup))

router.post(
  '/login', validation(userJoiShema, requireFields), controllerWrapper(ctrl.login))

router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.patch(
  '/',
  authenticate,
  validation(userJoiShema, requireField), controllerWrapper(ctrl.updateSubscriptionUser))

router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

module.exports = router
