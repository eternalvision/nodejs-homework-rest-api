const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../tmp')

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = file.fieldname + '-' + Math.round(Math.random() * 1e9)

    cb(null, `${uniqueSuffix}_${file.originalname}`)
  },
  limits: {
    fileSize: 1048576
  },
})

const fileFilter = (req, file, cb) =>
  file.mimetype === 'image/png' ||
  file.mimetype === 'image/jpg' ||
  file.mimetype === 'image/jpeg'
    ? cb(null, true)
    : cb(null, false)

const upload = multer({
  storage: uploadConfig,
  fileFilter
})

module.exports = upload
