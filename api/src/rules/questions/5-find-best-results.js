import { logger } from 'src/lib/logger'
import { dot, getVector } from 'src/lib/openAIHelper'

module.exports = {
  active: true,
  order: 500,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'question',
  file: __filename,
  command: async function ({ data, status }) {
    console.log('::: 5-finding-best-result-.js :::')
    try {
      // 5. we have the context summarized.
      // now we need to answer the question
      // with the best result
      // we'll do this by comparing the question
      // to each part of the context and finding the best match
      // then we'll only return the best results over 80%
      if (!data.context) {
        return {
          data,
          status: {
            code: 'error',
            message: 'There are no memories to summarize',
          },
        }
      }
      // json parse the context
      let memoryContext = JSON.parse(data.context)
      // loop through the contexts creating an embedding for each
      // then compare the question to each context
      // then return the results > 80%
      let bestResults = []
      for (let i = 0; i < memoryContext.length; i++) {
        let memory = memoryContext[i]
        let memoryContextVector = await getVector(memory.summary)
        let questionVector = JSON.parse(data.rephrasedTextVector)
        let score = dot(questionVector, memoryContextVector.embedding) * 100
        // set score to two decimal places
        score = Math.round(score * 100) / 100
        bestResults.push({
          title: memory.title,
          score,
          previousScore: memory.score,
          summary: memory.summary,
        })
        // sort the results by score
        bestResults.sort((a, b) => b.score - a.score)
      }
      data.context = JSON.stringify(bestResults)
    } catch (e) {
      logger.error(e)
    }
    return { data, status }
  },
}
