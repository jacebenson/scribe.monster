import { logger } from 'src/lib/logger'
import { answerMemory /*, dot, getVector*/ } from 'src/lib/openAIHelper'

module.exports = {
  active: true,
  order: 600,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'question',
  file: __filename,
  command: async function ({ data, status }) {
    console.log('::: 5-answer.js :::')
    try {
      // 6 answer the question
      if (!data.context) {
        return {
          data,
          status: {
            code: 'error',
            message: 'There are no memories to answer the question',
          },
        }
      }
      // data.context is a stringified array of memories
      // look up the procedure to answer the question
      // and then answer the question
      let memoryContext = JSON.parse(data.context)
      memoryContext.filter((memory) => memory.score > 75)
      let contextText = memoryContext.map((memory) => memory.summary).join(' ')
      let answerObj = await answerMemory({
        question: data.rephrasedText,
        context: contextText,
      })
      // lsit the sources of the memories
      let sources = memoryContext.map((memory) => {
        return { source: memory.source, sourceUrl: memory.sourceUrl }
      })
      // lets remove duplicates
      sources = sources.filter(
        (source, index, self) =>
          index === self.findIndex((t) => t.source === source.source)
      )

      // now append the sources to the answer
      sources.forEach((source) => {
        answerObj.text += `\n\nSource: ${source.source} ${source.sourceUrl}`
      })
      data.answer = answerObj.text
    } catch (e) {
      logger.error(e)
    }
    return { data, status }
  },
}
