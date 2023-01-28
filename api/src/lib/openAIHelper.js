import fetch from 'node-fetch'

import { db } from 'src/lib/db'
export const getVector = async (stringForVector) => {
  console.log(`:: Getting Vector ::`)
  let model = 'text-embedding-ada-002'
  let body = JSON.stringify({
    input: stringForVector,
    model,
  })
  //console.log({ body })
  let response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.OPENAITOKEN}`,
    },
    body,
  })
  let vectorizedContent = await response.json()
  if (vectorizedContent.error) {
    console.log(`:: Vector Error ::`)
    console.log({ error: vectorizedContent.error })
    return false
  }

  console.log(`:: Response Recieved ::`)
  //console.log({ vectorizedContent })
  return {
    embedding: vectorizedContent.data[0].embedding,
    model,
    tokens: vectorizedContent.usage.total_tokens,
  }
}
export const dot = (a, b) => {
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i]
  }
  return sum
}
export const getMemoriesSortedByVector = async (vector) => {
  let activeMemories = await db.memory.findMany({
    where: { active: true },
  })
  activeMemories = activeMemories.filter((memory) => {
    if (memory.vector === null) {
      return false
    }
    // data is stored as a string
    try {
      let parsedVector = JSON.parse(memory.vector)
      if (Array.isArray(parsedVector)) {
        return true
      }
    } catch (e) {
      return false
    }
  })
  let results = activeMemories.map((memory) => {
    let parsedVector = JSON.parse(memory.vector)
    let score = parseFloat((dot(parsedVector, vector) * 100).toFixed(2))
    let title = memory.title
    return {
      score,
      title,
      content: memory.content,
    }
  })
  results.sort((a, b) => {
    return b.score - a.score
  })
  // log top 5 the results score and title
  results.slice(0, 5).forEach((result) => {
    console.log({ score: result.score, title: result.title.substring(0, 20) })
  })

  return results
}

export const summarizeMemory = async ({ memory, query }) => {
  // call openai to summarize the memory
  // get the summarize memory
  let model = 'text-curie-001' //'text-davinci-002'
  let stop = ['MEMORY:']
  let temperature = 0 //0.7
  let top_p = 1
  let frequency_penalty = 0
  let presence_penalty = 0
  let max_tokens = 2000
  let estimatedTokens = Math.floor(memory.content.length / 2.9) || 0
  let newMaxTokens = max_tokens - estimatedTokens
  console.log({
    memoryLength: memory.content.length,
    estimatedTokens,
    max_tokens,
  })
  let summaryMemory = await db.memory.findFirst({
    where: { title: 'Summarize' },
  })
  // now lets merge the prompt with the memory and query
  let prompt = summaryMemory.content.replace('{{MEMORY}}', memory.content)
  prompt = prompt.replace('{{QUERY}}', query)
  //console.log({ order: 2, prompt })
  let body = JSON.stringify({
    prompt: prompt + '\n```js',
    max_tokens: newMaxTokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
    model,
    stop,
  })
  let response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.OPENAITOKEN}`,
    },
    body,
  })
  let summarizedMemory = await response.json()
  if (summarizedMemory.error) {
    console.log(`:: Error ::`)
    console.log({ summarizedMemory })
    console.log({ memory: memory.title })
    return false
  }
  console.log(`:: Response Recieved ::`)
  //console.log({ order: 2, summarizedMemory: JSON.stringify(summarizedMemory) })
  await createPrompt({
    user: null,
    prompt,
    action: 'summarize',
    response: summarizedMemory.choices[0].text,
    queryTokens: summarizedMemory.usage.prompt_tokens,
    responseTokens: summarizedMemory.usage.completion_tokens,
  })
  return {
    text: summarizedMemory.choices[0].text,
    tokens: summarizedMemory.usage.total_tokens,
    model,
  }
}

export const answerMemory = async ({ question, context }) => {
  let model = 'text-davinci-003' //'text-davinci-002'
  let stop = ['MEMORY:']
  let temperature = 0
  let top_p = 1
  let frequency_penalty = 0
  let presence_penalty = 0
  let max_tokens = 2000
  let estimatedTokens = Math.floor(context.length / 2.9)
  let newMaxTokens = max_tokens - estimatedTokens

  let answerMemory = await db.memory.findFirst({
    where: { title: 'Answer' },
  })
  //console.log({ order: 1, answerMemory: answerMemory.title, estimatedTokens })
  // now lets merge the prompt with the memory and query
  let prompt = answerMemory.content.replace('{{CONTEXT}}', context)
  prompt = prompt.replace('{{QUESTION}}', question)
  //console.log({ order: 2, prompt })
  let body = JSON.stringify({
    prompt,
    max_tokens: newMaxTokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
    model,
    stop,
  })
  let response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.OPENAITOKEN}`,
    },
    body,
  })
  let answeredMemory = await response.json()
  if (answeredMemory.error) {
    console.log(`:: Answer Memory Error ::`)
    console.log({ error: answeredMemory.error })
    return false
  }
  console.log(`:: Answer Recieved ::`)
  await createPrompt({
    user: null,
    prompt,
    action: 'answer',
    response: answeredMemory.choices[0].text,
    queryTokens: answeredMemory.usage.prompt_tokens,
    responseTokens: answeredMemory.usage.completion_tokens,
  })
  //console.log({ order: 2, answeredMemory: JSON.stringify(answeredMemory) })
  return {
    text: answeredMemory.choices[0].text,
    tokens: answeredMemory.usage.total_tokens,
    model,
  }
}
export const createPrompt = async ({
  user,
  prompt,
  action,
  response,
  queryTokens,
  responseTokens,
}) => {
  //if (!user) throw new Error('User is required')
  if (!prompt) throw new Error('Prompt is required')
  if (!action) throw new Error('Action is required')
  // if user if falsy, then use jacebenson
  let userLookup = null
  if (!user) {
    userLookup = await db.user.findFirst({
      where: { username: 'guest' },
    })
  }
  if (!userLookup) {
    userLookup = await db.user.findFirst({
      where: { cuid: user?.cuid },
    })
  }
  let newPrompt = await db.prompt.create({
    data: {
      userCuid: userLookup.cuid,
      prompt,
      action,
      response,
    },
  })
  let newScribeRequest = await db.scribeRequest.create({
    data: {
      modelInstanceCuid: 'COMPLEX',
      userCuid: userLookup.cuid,
      queryTokens,
      responseTokens,
    },
  })
  console.log(`:: Prompt Created ::`)
  //console.log({ newPrompt, newScribeRequest })
  return { prompt: newPrompt, request: newScribeRequest }
}
export const filterMemories = async ({ memories, quantity, score }) => {
  // memories is an array of memories with title, and score
  // quantity is the number of memories to return
  // score is the minimum score to return
  let filteredMemories = memories.filter((memory) => memory.score >= score)
  let sortedMemories = filteredMemories.sort((a, b) => b.score - a.score)
  let finalMemories = sortedMemories.slice(0, quantity)
  return finalMemories
}
export const addTokens = ({ tokenObj, model, tokens }) => {
  //console.log({ function: 'addTokens', tokenObj, model, tokens })
  if (tokenObj?.[model] === undefined) {
    tokenObj[model] = tokens
  } else {
    tokenObj[model] += tokens
  }
  return tokenObj
}
export const addCost = ({ costObj, model, tokens }) => {
  if (costObj.total === undefined) {
    costObj.total = 0
  }
  if (tokens === undefined) {
    return costObj
  }
  let priceSheetPerToken = {
    'text-embedding-ada-002': 0.0004 / 1000,
    'text-curie-001': 0.002 / 1000,
    'text-davinci-003': 0.02 / 1000,
  }
  if (costObj?.[model] === undefined) {
    costObj[model] = tokens * priceSheetPerToken[model]
  } else {
    costObj[model] += tokens * priceSheetPerToken[model]
  }
  costObj.total += tokens * priceSheetPerToken[model]
  return costObj
}
export const isJace = (user) => {
  if (user.username === 'jacebenson') {
    return true
  }
  return false
}
