import { logger } from 'src/lib/logger'
module.exports = {
  active: true,
  order: 10,
  when: ['after'],
  operation: ['read'],
  table: 'property',
  file: __filename,
  command: async function ({ data }) {
    try {
      console.log('read', data)
      // if type is encrypted, delete it from the data
      if (data.type === 'hidden') {
        delete data.value
      }
    } catch (e) {
      logger.error(e)
    }
    return await { data }
  },
}
