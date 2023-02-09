import fetch from 'node-fetch'

import { db } from 'src/lib/db'

import { log } from './util'
export const getTokenCount = (content) => {
  // we are going to guess that each token is 4 bytes
  // this is not accurate, but it's a good enough guess
  // for our purposes
  console.log(`:: Getting Token Count ::`)
  //console.log({ content.content })
  let tokenCount = content.length / 4
  tokenCount = Math.floor(tokenCount)
  //console.log({ tokenCount })
  return tokenCount
}
export const models = {
  embedding: {
    maxTokens: 2048 - 400,
    model: 'text-embedding-ada-002',
    endpoint: 'https://api.openai.com/v1/embeddings',
  },
  curie: {
    maxTokens: 2048 - 400,
    model: 'text-curie-001',
    endpoint: 'https://api.openai.com/v1/completions',
  },
  davinci: {
    maxTokens: 4096 - 100,
    model: 'text-davinci-003',
    endpoint: 'https://api.openai.com/v1/completions',
  },
}
export const getVector = async (stringForVector) => {
  console.log(`:: Getting Vector ::`)
  let body = JSON.stringify({
    input: stringForVector,
    model: models.embedding.model,
  })
  //console.log({ body })
  let response = await fetch(models.embedding.endpoint, {
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
    delete vectorizedContent.embedding
    console.log({ error: vectorizedContent.error })
    return false
  }

  console.log(`:: Response Recieved ::`)
  //console.log({ vectorizedContent })
  return {
    embedding: vectorizedContent.data[0].embedding,
    model: models.embedding.model,
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
export const createThread = async () => {
  let thread = await db.thread.create({
    data: {},
  })
  return thread
}
export const getRecentQuestion = async ({ thread }) => {
  console.log(`:: Getting Recent Question ::`)
  if (!thread) return []
  let user = context?.currentUser
  if (!user) return []
  let userLookup = await db.user.findFirst({
    where: { cuid: user?.cuid },
  })
  if (!userLookup) return []
  let recentQuestions = await db.question.findMany({
    where: { thread },
    orderBy: { cuid: 'desc' }, // cuid is k-sorted which means its time sorted
    take: 3,
  })
  return recentQuestions
}
export const getMemoriesChunksSortedByVector = async (vector) => {
  console.log(`:: Getting Memories Chunks Sorted By Vector ::`)
  let activeChunks = await db.memoryChunk.findMany({
    where: {
      memory: {
        active: true,
        vector: {
          not: null,
        },
      },
    },
    select: {
      title: true,
      content: true,
      vector: true,
      memory: {
        select: {
          source: true,
          sourceUrl: true,
        },
      },
    },
  })
  console.log({ activeChunks: activeChunks.length })
  if (activeChunks.length === 0) return []
  // filter out any chunks that don't have a vector
  let results = activeChunks.map((chunk) => {
    let parsedVector = JSON.parse(chunk.vector)
    let score = parseFloat((dot(parsedVector, vector) * 100).toFixed(2))
    let title = chunk.title
    return {
      score,
      title,
      content: chunk.content,
      source: chunk.title,
      sourceUrl: chunk.memory.sourceUrl,
    }
  })
  results.sort((a, b) => {
    return b.score - a.score
  })
  // log the title and score of the results > 75
  results.forEach((result) => {
    if (result.score > 75) {
      console.log({ score: result.score, title: result.title.substring(0, 20) })
    }
  })
  return results
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
      source: memory.source,
      sourceUrl: memory.sourceUrl,
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
export const compareVectors = async ({ vector1, vector2 }) => {
  let score = parseFloat((dot(vector1, vector2) * 100).toFixed(2))
  return score
}

export const modifyQuestionWithPronouns = async ({
  question,
  recentQuestions,
}) => {
  console.log(`:: Modify Question ::`)
  //console.log({ question, recentQuestions })
  if (recentQuestions.length === 1) {
    //we create teh question when we create the thread
    // return the question
    console.log(`:: No Recent Question ::`)
    return question
  }
  console.log(':: Getting Modify Prompt ::')
  let modifyQuestionMemory = await db.memory.findFirst({
    where: { title: 'Modify Prompt to Include Pronouns' },
  })
  console.log(':: Modify Prompt Recieved ::')
  // now lets merge the prompt with the memory and query
  let questionFromRecentQuestion = recentQuestions[1].text.split('QUESTION:')[1]
  //console.log({
  //  //prompt: modifyQuestionMemory.content,
  //  recentQuestion: questionFromRecentQuestion,
  //})
  let prompt = modifyQuestionMemory.content.replace('{{QUESTION}}', question)
  prompt = prompt.replace('{{RECENTQUESTION}}', questionFromRecentQuestion)
  prompt = prompt.replace('{{RECENTANSWER}}', recentQuestions[1]?.answer)
  console.log(':: Prompt Merged ::')
  let newMaxTokens = models.curie.maxTokens - getTokenCount(prompt)
  console.log({
    promptLength: prompt.length,
    newMaxTokens,
  })

  let body = JSON.stringify({
    model: models.curie.model,
    prompt,
    max_tokens: newMaxTokens,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ['MODIFY:'],
  })
  console.log({ body })
  //console.log({ order: 3, body })
  let response = await fetch(models.curie.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.OPENAITOKEN}`,
    },
    body,
  })
  let modifiedQuestion = await response.json()
  if (modifiedQuestion.error) {
    console.log({ error: modifiedQuestion.error })
    return false
  }
  //console.log({ order: 4, modifiedQuestion })
  let modifiedQuestionContent = modifiedQuestion.choices[0].text
  //console.log({ order: 5, modifiedQuestionContent })
  console.log({ modifiedQuestionContent })
  if (modifiedQuestionContent.trim() === '') return question
  return modifiedQuestionContent
}
export const chunkData = (data, chunkSize) => {
  let chunks = []
  let i = 0
  let n = data.length
  while (i < n) {
    chunks.push(data.slice(i, (i += chunkSize)))
  }
  return chunks
}
export const summarize = async ({ content, query }) => {
  console.log(`:: Summarize Context ::`)
  // we may need to chunk the context into tokens of 1000 characters each
  // we need to lookup how to summarize the context
  let chunkedContent = chunkData(content, 1000)

  let summaryMemory = await db.memory.findFirst({
    where: { title: 'Summarize' },
  })
  // now lets use Promise.all to get all the summaries
  let summaries = await Promise.all(
    chunkedContent.map(async (chunk) => {
      let newMaxTokens = models.curie.maxTokens - getTokenCount(chunk)
      console.log({
        chunkLength: chunk.length,
        estimatedTokens: getTokenCount(chunk),
        max_tokens: models.curie.maxTokens,
      })
      let prompt = summaryMemory.content.replace('{{MEMORY}}', chunk)
      prompt = prompt.replace('{{QUERY}}', query)
      let body = JSON.stringify({
        model: models.curie.model,
        prompt,
        max_tokens: newMaxTokens,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['SUMMARY:'],
      })
      let response = await fetch(models.curie.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.OPENAITOKEN}`,
        },
        body,
      })
      let summary = await response.json()
      if (summary.error) {
        console.log({ error: summary.error })
        return false
      }
      let summaryContent = summary.choices[0].text
      return summaryContent
    })
  )
  console.log({ summaries })
  let summary = summaries.join('\n\n')
  console.log({ summary })
  return summary
}
export const summarizeAllMemories = async ({ memories, query }) => {
  console.log(`:: Summarize All Memories ::`)
  let summaryMemory = await db.memory.findFirst({
    where: { title: 'Summarize' },
  })
  // now lets use Promise.all to get all the summaries
  let summaries = await Promise.all(
    memories.map(async (memory) => {
      let newMaxTokens = models.curie.maxTokens - getTokenCount(memory.content)
      console.log({
        memoryLength: memory.content.length,
        estimatedTokens: getTokenCount(memory.content),
        max_tokens: models.curie.maxTokens,
      })
      let prompt = summaryMemory.content.replace('{{MEMORY}}', memory.content)
      prompt = prompt.replace('{{QUERY}}', query)
      let body = JSON.stringify({
        model: 'text-curie-001',
        prompt,
        max_tokens: newMaxTokens,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['MEMORY:'],
      })
      let response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.OPENAITOKEN}`,
        },
        body,
      })
      let summary = await response.json()
      if (summary.error) {
        console.log({ error: summary.error })
        return false
      }
      let summaryContent = summary.choices[0].text
      console.log({ summaryContent })
      return summaryContent?.trim()
    })
  )
  console.log({ summaries })
  return summaries
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
  let estimatedTokens = getTokenCount(memory.content)
  let newMaxTokens = models.curie.maxTokens - estimatedTokens
  console.log({
    memoryLength: memory.content.length,
    estimatedTokens,
    max_tokens: models.curie.maxTokens,
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
  let response = await fetch(models.curie.endpoint, {
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
  console.log(`:: Answer Memory ::`)
  console.log({ question, context })
  let model = 'text-davinci-003' //'text-davinci-002'
  let stop = ['MEMORY:']
  let temperature = 0
  let top_p = 1
  let frequency_penalty = 0
  let presence_penalty = 0
  let estimatedTokens = getTokenCount(context || '')
  let newMaxTokens = 500 //models.davinci.maxTokens - estimatedTokens

  let answerMemory = await db.memory.findFirst({
    where: { title: 'Answer' },
  })
  //console.log({ order: 1, answerMemory: answerMemory.title, estimatedTokens })
  // now lets merge the prompt with the memory and query
  let prompt = answerMemory.content.replace('{{CONTEXT}}', context)
  prompt = prompt.replace('{{QUESTION}}', question)
  console.log({
    order: 2,
    prompt,
    newMaxTokens,
    max_tokens: newMaxTokens,
    estimatedTokens,
  })
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
  let response = await fetch(models.davinci.endpoint, {
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
    await log({
      message: prompt,
      source: 'openAi.answerMemory',
      givenContext: context,
    })
    return {
      text: `I'm sorry, I had a glitch generating the answer.  Try asking again.`,
    }
    return false
  }
  console.log(`:: Answer Recieved ::`)
  //await createPrompt({
  //  user: null,
  //  prompt,
  //  action: 'answer',
  //  response: answeredMemory.choices[0].text,
  //  queryTokens: answeredMemory.usage.prompt_tokens,
  //  responseTokens: answeredMemory.usage.completion_tokens,
  //})
  console.log({ order: 2, answeredMemory: JSON.stringify(answeredMemory) })
  return {
    text: `I think you meant, "${question.trim()}"

${answeredMemory.choices[0].text.trim()}`,
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

export const rephraseQuestion = async ({ question, recentQuestions }) => {
  console.log(`:: Rephrase Question ::`)
  //console.log({ question, recentQuestions })
  // look up the procedure for rephasing the question with pronouns
  let rephraseMemory = await db.memory.findFirst({
    where: { title: 'Modify Prompt to Include Pronouns' },
    select: { content: true },
    take: 1,
  })
  let prompt = rephraseMemory.content.replace('{{QUESTION}}', question)
  prompt = prompt.replace('{{RECENTQUESTION}}', recentQuestions[0].text)
  prompt = prompt.replace('{{RECENTANSWER}}', recentQuestions[0].answer || '')
  console.log(':: Rephrased Prompt ::', prompt)
  let tokenCount = getTokenCount(prompt)
  let max_tokens = models.curie.maxTokens - tokenCount
  let body = JSON.stringify({
    model: models.curie.model,
    prompt,
    max_tokens,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ['MODIFY:'],
  })
  let response = await fetch(models.curie.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.OPENAITOKEN}`,
    },
    body,
  })
  let rephrasedMemory = await response.json()
  if (rephrasedMemory.error) {
    console.log(`:: Rephrase Memory Error ::`)
    console.log({ error: rephrasedMemory.error })
    return false
  }
  console.log(`:: Rephrase Recieved ::`)
  // if response is empty, then return original question
  let rephrasedQuestion = rephrasedMemory.choices[0].text.trim()
  if (rephrasedQuestion === '') {
    return rephrasedQuestion
  }
  // if response is not empty, then return rephrased question
  return rephrasedQuestion
}
