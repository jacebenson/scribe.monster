import { logger } from 'src/lib/logger'
import { createThread } from 'src/services/threads/threads'

module.exports = {
  active: true,
  order: 100,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'question',
  file: __filename,
  command: async function ({ data, status }) {
    console.log('::: 1-recall.js :::')
    try {
      // 1. look up the thread and set it
      if (!data.threadCuid) {
        let thread = await createThread({ input: {} })
        data.threadCuid = thread.cuid
      }
    } catch (e) {
      logger.error(e)
    }
    return { data, status }
  },
}
