import { logger } from 'src/lib/logger'
import { summarize } from 'src/lib/openAIHelper'

module.exports = {
  active: true,
  order: 400,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'question',
  file: __filename,
  command: async function ({ data, status }) {
    console.log('::: 4-research-.js :::')
    try {
      // 3. look up 5 memories and filter out
      // the ones that don't match up to 80%
      // then loop through the memories and dot multiply them
      // if the dot product is greater than 80% then we'll
      // add it to the list of memories to use
      // then we'll summarize the list of memories
      // and ask the rephrased question with the context of the
      // summarized memories
      if (!data.context) {
        return {
          data,
          status: {
            code: 'error',
            message: 'There are no memories to summarize',
          },
        }
      }
      // data.context is a stringified array of memories
      console.log('data.context', data.context)
      let contextMemory = JSON.parse(data.context)
      let summarizedMemories = []
      for (let i = 0; i < contextMemory.length; i++) {
        let memory = contextMemory[i]
        console.log({
          function: 'summarizing memory',
          title: memory.title,
          memoryLen: memory.content.length,
        })
        let summary = await summarize({ content: memory.content })

        console.log('summary', summary)
        summarizedMemories.push({
          title: memory.title,
          score: memory.score,
          summary,
        })
      }
      data.context = JSON.stringify(summarizedMemories)
    } catch (e) {
      logger.error(e)
    }
    return { data, status }
  },
}
