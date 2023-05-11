import { render } from 'src/emails/loginEmail.mjml.js'
import { email } from 'src/lib/email'
import { logger } from 'src/lib/logger'
import { getProperty, log } from 'src/lib/util'
module.exports = {
  active: true,
  order: 100,
  when: ['before'],
  operation: ['update'],
  file: __filename || 'onUpdateSendUserLoginEmail',
  table: 'user',
  command: async function ({ data, status }) {
    try {
      // we only want to trigger this if the loginExpiresAt is in the future
      // and if the salt changes (which means the password changed)
      // we set the salt to null when they login without triggering this rule
      // so when they login, we set the salt to a random string






      if (typeof data._unencryptedToken !== 'string') return { data, status }
      // now we need to send the email
      // but first we need to base64 encode the username and password
      let code = data._unencryptedToken
      let encoded = Buffer.from(`${data._email}:${code}`).toString('base64')
      let domain = (await getProperty('domain')) || 'https://example.com'
      let loginLink = `${domain}/login?magic=${encoded}`
      if(process.env.ENV === 'DEV') {
        loginLink = `http://localhost:8910/login?magic=${encoded}`
        console.log({ function: 'onUpdateSendUserLoginEmail', code, loginLink })
        delete data._email
        delete data._unencryptedToken
        return { data, status }
      }

      let client = await email({ provider: 'mailgun' })
      let brand = (await getProperty('brand')) || 'ScribeMonster'

      let rendered = render({ code, loginLink, brand })
      let to = data._email
      let from = `${brand} <jace@${client.domain}>`
      let subject = `${code} - Your ${brand} Login Code`
      let html = rendered.html
      if (client.error) {
        logger.error(client.error)
        console.log({ function: 'onUpdateSendUserLoginEmail', client })
      }
      if (!client.error && process.env.ENV !== 'DEV' ) {
        await client.send({ to, from, subject, html }, (error) => {
          if (error) logger.error(error)
          console.log({ function: 'onUpdateSendUserLoginEmail', message: `${to} requested login code` })
        })
      }
      delete data._email
      delete data._unencryptedToken
    } catch (e) {
      logger.error(e)
      log(e.message)
    }
    return await { data, status }
  },
}
