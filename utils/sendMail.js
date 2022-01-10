const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (data) => {
  const email = { ...data, from: 'xiomi70@ukr.net' }
  await sgMail.send(email)
  return true
}

module.exports = sendMail
