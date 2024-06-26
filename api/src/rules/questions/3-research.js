import { logger } from 'src/lib/logger'
import {
  filterMemories,
  getMemoriesSortedByVector,
  getMemoriesChunksSortedByVector,
} from 'src/lib/openAIHelper'

module.exports = {
  active: true,
  order: 300,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'question',
  file: __filename,
  command: async function ({ data, status }) {
    console.log('::: 3-research-.js :::')
    try {
      // 3. look up 5 memories and filter out
      // the ones that don't match up to 80%
      // then loop through the memories and dot multiply them
      // if the dot product is greater than 80% then we'll
      // add it to the list of memories to use
      // then we'll summarize the list of memories
      // and ask the rephrased question with the context of the
      // summarized memories
      let hasRephrasedText = data?.rephrasedText
      console.log({ function: '3-research.js', hasRephrasedText })
      //if (!data.rephrasedTextVector) {
      if (!hasRephrasedText) {
        return {
          data,
          status: {
            code: 'error',
            message: 'There was an issue vectorizing your question',
          },
        }
      }
      let questionVector = JSON.parse(data.rephrasedTextVector)
      //let memories = await getMemoriesSortedByVector(questionVector)
      console.log({ function: '3-research.js - before memorychunk lookup sorted' })
      let memories = await getMemoriesChunksSortedByVector(questionVector)
      console.log({ function: '3-research.js', memories })
      console.log({ function: 'getMemoriesChunksSortedByVector', memories })
      memories = await filterMemories({ memories, quantity: 5, score: 75 })
      if (memories.length === 0) {
        // i could look up some restful apis here
        return {
          data,
          status: {
            code: 'error',
            message: "I don't recall anything about that",
          },
        }
      }
      //let memoryChunks = await getMemoriesChunksSortedByVector(questionVector)
      data.context = JSON.stringify(memories)
    } catch (e) {
      logger.error(JSON.stringify(e))
    }
    return { data, status }
  },
}
