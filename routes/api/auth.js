const express = require('express')
const { controllerWrapper, validation, authenticate, upload } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const { userJoiShema } = require('../../models/user')

const router = express.Router()

router.post(
  '/signup',
  validation(userJoiShema, 'email', 'password'), controllerWrapper(ctrl.signup))

router.post(
  '/login',
  validation(userJoiShema, 'email', 'password'), controllerWrapper(ctrl.login))

router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.patch(
  '/',
  authenticate,
  validation(userJoiShema, 'subscription'), controllerWrapper(ctrl.updateSubscriptionUser))

router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))

router.post('/verify', validation(userJoiShema, 'email'), controllerWrapper(ctrl.reVerify))

module.exports = router
