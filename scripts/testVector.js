// To access your database
// Append api/* to import from api and web/* to import from web
import {
  getVector,
  getMemoriesSortedByVector,
  summarizeMemory,
  answerMemory,
  filterMemories,
  addTokens,
  addCost,
} from 'api/src/lib/openAIHelper'

export default async ({ args }) => {
  try {
    // Your script here...
    console.log(':: Executing script with args ::')
    //console.log({ args })
    if (args._[1] === undefined || args._[1] === '') {
      console.log(':: No Query provided ::')
      return
    }
    console.log(`:: Loading vector of Query ::`)
    let query = args._[1]
    let vectorData = await getVector(query)
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
      console.log({ title: memory.title, score: memory.score })
      let summary = await summarizeMemory({ memory, query })
      context += summary.text
      tokenUsage = addTokens({
        tokenObj: tokenUsage,
        model: summary.model,
        tokens: summary.tokens,
      })
    }
    if (context === '') {
      console.log(':: No context found ::')
      return
    }
    // now lets add the query
    // lets go ahead and try the prompt
    let answer = await answerMemory({ question: query, context })
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

    console.log({
      //context,
      tokenUsage,
      cost,
      query,
      result: answer.text,
    })
  } catch (e) {
    console.log({ e })
  }
}
