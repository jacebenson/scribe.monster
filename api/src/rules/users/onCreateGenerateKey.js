import { logger } from 'src/lib/logger'
module.exports = {
  active: true,
  order: 100,
  when: ['before'],
  operation: ['create'],
  file: __filename,
  table: 'user',
  command: async function ({ data }) {
    console.log('data')
    try {
      data.extensionKey = (function randomStringGenerator() {
        let characters =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()'
        let randomString = ''
        for (let i = 0; i < 16; i++) {
          randomString += characters.charAt(
            Math.floor(Math.random() * characters.length)
          )
        }
        return randomString
      })()
    } catch (e) {
      logger.error(e)
    }
    return await { data }
  },
}
