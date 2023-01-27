import { UserInputError } from '@redwoodjs/graphql-server'

import {
  getVector,
  getMemoriesSortedByVector,
  summarizeMemory,
  answerMemory,
  filterMemories,
  addTokens,
  addCost,
} from 'src/lib/openAIHelper'

export const stewQuestion = async ({ input }) => {
  console.log({ function: 'ask', input })
  try {
    let question = input.question
    let vectorData = await getVector(question)
    let vector = vectorData.embedding
    let tokenUsage = {}
    tokenUsage = addTokens({
      tokenObj: tokenUsage,
      model: vectorData.model,
      tokens: vectorData.tokens,
    })
    let memories = await getMemoriesSortedByVector(vector)
    // filter to only the top 3 with a score of 70 or higher
    memories = await filterMemories({ memories, quantity: 3, score: 70 })
    // loop through the top 3 memories
    // this needs to wait for the summarizeMemory function to return
    // and wait for the summarizeMemory function to return
    let context = ''
    for (let i = 0; i < memories.length; i++) {
      let memory = memories[i]
      let summary = await summarizeMemory({ memory, query: question })
      context += summary.text
      tokenUsage = addTokens({
        tokenObj: tokenUsage,
        model: summary.model,
        tokens: summary.tokens,
      })
    }
    // now lets add the query
    // lets go ahead and try the prompt
    let answer = await answerMemory({ question, context })
    tokenUsage = await addTokens({
      tokenObj: tokenUsage,
      model: answer.model,
      tokens: answer.tokens,
    })
    // figure out the cost of the query
    // look over the token usage and add the cost
    let cost = {}
    for (let model in tokenUsage) {
      cost = addCost({ costObj: cost, model, tokens: tokenUsage[model] })
    }
    let record = {
      question: question || 'No question',
      context: 'hidden', //context || 'No context',
      answer: answer.text || 'No answer',
      cost: {}, // cost || {},
      tokenUsage: tokenUsage || {},
    }
    return { ...record }
  } catch (error) {
    throw new UserInputError(error.message)
  }
}
