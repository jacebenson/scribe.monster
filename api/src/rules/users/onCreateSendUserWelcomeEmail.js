import { render } from 'src/emails/welcomeemail.mjml.js'
import { email } from 'src/lib/email'
import { logger } from 'src/lib/logger'
import { getProperty } from 'src/lib/util'
module.exports = {
  active: true,
  order: 100,
  when: ['after'],
  operation: ['create'],
  file: __filename,
  table: 'user',
  command: async function ({ data }) {
    console.log('data')
    try {
      let brand = (await getProperty('brand')) || 'Undefined'
      let domain = (await getProperty('domain')) || 'https://example.com'
      let rendered = render({
        name: data.name,
        login: { text: 'Login', url: `${domain}/login` },
        brand,
        whatIsThis: `${brand} is a Chrome extension that give you the power of openAI.

At the end of November I found out about ChatGPT and I was wondering what else OpenAI had to offer.  I was delighted to find the text apis and wanted to learn more about it so I thought I'd make something with it.

It took a weekend to build this site and the extension and a few more days to get it approved on the Chrome Web Store.  I'm learning all about that flow now.

That's all to say, THANK YOU for trying this out!`,
        welcomeImage: { text: '', url: `${domain}/jace.jpeg` },
        introVideo: {
          text: `What's with OpenAI and ServiceNow?`,
          url: 'https://youtu.be/wVBuizJkhSA',
        },
        cta1: {
          text: 'Try the extension',
          url: 'https://chrome.google.com/webstore/detail/scribemonster/jdibjdmndifkeafbhbajogekgeolmmfh?hl=en&authuser=0',
        },
        cta2: {
          text: 'Let me know what you think',
          url: 'mailto:jace@benson.run',
        },
        cta3: {
          text: 'Share on LinkedIn',
          url: 'https://www.linkedin.com/sharing/share-offsite/?url=https://scribe.monster',
        },
        cta4: {
          text: 'Subscribe on YouTube',
          url: 'https://www.youtube.com/@JaceNow',
        },
      })
      let client = await email({ provider: 'mailgun' })
      if (!client.error) {
        await client?.send(
          {
            to: data.email,
            from: `${brand} <jace@${client.domain}>`,
            'h:Reply-To': `jace@$tskr.io`, //not working
            subject: `Welcome to ${brand}`,
            html: rendered.html,
          },
          (error, body) => {
            if (error) logger.error(error)
            logger.info(body)
          }
        )
      }
      if (client.error) {
        logger.error(`${client.error}`)
      }
    } catch (e) {
      logger.error(e)
    }
    return await { data }
  },
}
