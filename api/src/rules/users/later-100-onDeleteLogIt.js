//import { db } from 'src/lib/db'
import { log } from 'src/lib/util'
module.exports = {
  active: false,
  order: 100,
  when: ['after'],
  operation: ['delete'],
  table: 'user',
  file: __filename || 'deletelog?',
  command: async function ({ data }) {
    await log(`Deleted ${data.name}`, `api\\${__filename.split('\\dist\\')[1]}`)
    return { data }
  },
}
