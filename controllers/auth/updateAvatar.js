const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')
const { BadRequest } = require('http-errors')
const { User } = require('../../models')
const { sendSuccessRes } = require('../../utils')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(new BadRequest('Error upload file'))
  }

  const { _id } = req.user
  const { path: tmpUpload, originalname } = req.file

  try {
    const filename = `${String(_id)}_${originalname}`

    const resultUpload = path.join(avatarsDir, filename)

    await fs.rename(tmpUpload, resultUpload)

    const avatar = path.join('/avatars', filename)

    await Jimp.read(resultUpload)
      .then((image) => image.resize(250, 250).write(resultUpload))
      .catch(error => console.log(error))

    await User.findByIdAndUpdate(_id, { avatarURL: avatar })

    sendSuccessRes(res, { message: 'File uploaded successfully', avatarURL: avatar })
  } catch (error) {
    await fs.unlink(tmpUpload)
    throw error
  }
}

module.exports = updateAvatar
