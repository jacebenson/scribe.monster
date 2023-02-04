import fetch from 'node-fetch'

import { db } from 'src/lib/db'

import { getProperty } from './util'

let providerSheet = ({ responseTokens, characters }) => {
  if (!responseTokens) return 0
  if (!characters) return 0
  return {
    openAi: {
      name: 'OpenAI',
      models: {
        'text-davinci-003': {
          name: 'Davinci',
          cost: 0.02 / 1000,
          maxTokens: 4000,
          model: 'text-davinci-003',
          endpoint: 'https://api.openai.com/v1/completions',
        },
        'text-curie-001': {
          name: 'Curie',
          cost: 0.002 / 1000,
          maxTokens: 2048,
          model: 'text-curie-001',
          endpoint: 'https://api.openai.com/v1/completions',
        },
        'text-babbage-001': {
          name: 'Babbage',
          cost: 0.0002 / 1000,
          maxTokens: 2048,
          model: 'text-babbage-001',
          endpoint: 'https://api.openai.com/v1/completions',
        },
        'text-ada-001': {
          name: 'Ada',
          cost: 0.00002 / 1000,
          maxTokens: 2048,
          model: 'text-ada-001',
          endpoint: 'https://api.openai.com/v1/completions',
        },
        'text-embedding-ada-002': {
          name: 'Embedding Ada',
          cost: 0.0004 / 1000,
          maxTokens: 8192,
          model: 'text-embedding-ada-002',
          endpoint: 'https://api.openai.com/v1/embeddings',
        },
        'code-davinci-002': {
          name: 'Code Davinci',
          cost: 0.02 / 1000,
          maxTokens: 4000,
          model: 'code-davinci-002',
          endpoint: 'https://api.openai.com/v1/completions',
        },
        'code-davinci-edit-001': {
          name: 'Code Davinci Edit',
          cost: 0.02 / 1000,
          maxTokens: 4000,
          model: 'code-davinci-edit-001',
          endpoint: 'https://api.openai.com/v1/edits',
        },
      },
    },
    cohere: {
      name: 'Cohere',
      models: {
        generate: {
          name: 'Generate',
          cost: 0.0025,
          maxTokens: 2048,
          model: 'command-xlarge-20221108',
          endpoint: 'https://api.cohere.ai/generate',
        },
        embedding: {
          name: 'Embedding',
          cost: 0.001,
          maxTokens: 4096,
          model: 'large',
          endpoint: 'https://api.cohere.ai/embed',
        },
        classify: {
          name: 'Classify',
          cost: 0.002,
          maxTokens: 2048,
          model: 'large',
          endpoint: 'https://api.cohere.ai/classify',
        },
        tokenize: {
          name: 'Tokenize',
          cost: 0,
          maxTokens: null,
          model: null,
          endpoint: 'https://api.cohere.ai/tokenize',
        },
        detokenize: {
          name: 'Detokenize',
          cost: 0,
          maxTokens: null,
          model: null,
          endpoint: 'https://api.cohere.ai/detokenize',
        },
        detectLanguage: {
          name: 'Detect Language',
          cost: 0,
          maxTokens: null,
          model: null,
          endpoint: 'https://api.cohere.ai/detect-language',
        },
      },
    },
    ai21: {
      name: 'AI21',
      models: {
        j1Large: {
          name: 'J1 Large',
          cost: 0.0003 + 0.03 * responseTokens,
          maxTokens: 2047,
          model: 'j1-large',
          endpoint: 'https://api.ai21.com/studio/v1/j1-large/complete',
        },
        j1Grande: {
          name: 'J1 Grande',
          cost: 0.0008 + 0.08 * responseTokens,
          maxTokens: 2047,
          model: 'j1-grande',
          endpoint: 'https://api.ai21.com/studio/v1/j1-grande/complete',
        },
        j1GrandeInstruct: {
          name: 'J1 Grande Instruct',
          cost: 0.0008 + 0.08 * responseTokens,
          maxTokens: 2047,
          model: 'j1-grande-instruct',
          endpoint:
            'https://api.ai21.com/studio/v1/experimental/j1-grande-instruct/complete',
        },
        j1Jumbo: {
          name: 'J1 Jumbo',
          cost: 0.005 + 0.25 * responseTokens,
          maxTokens: 2047,
          model: 'j1-jumbo',
          endpoint: 'https://api.ai21.com/studio/v1/j1-jumbo/complete',
        },
        rewrite: {
          name: 'Rewrite',
          cost: 0.005 + 0.00002 * characters,
          maxTokens: 2047,
          model: 'rewrite',
          endpoint: 'https://api.ai21.com/studio/v1/experimental/rewrite',
        },
      },
    },
  }
}

export const getPreference = async (userCuid, key) => {
  const preference = await db.preference.findFirst({
    where: { userCuid, entity: key },
  })
  if (!preference) return null
  return preference.value
}
export const saveQuestion = async (userCuid, question, response) => {
  let text = question
  let answer = response
  const questionDB = await db.question.create({
    data: {
      user: { connect: { cuid: userCuid } },
      text,
      answer,
    },
  })
  return questionDB
}
export const saveActivity = async ({ userCuid, activity }) => {
  //console.log({ function: 'saveActivity', userCuid, activity })
  const activityDB = await db.activity.create({
    data: {
      userCuid,
      ...activity,
    },
  })
  return activityDB
}
export const getGuestUser = async () => {
  const guestUser = await db.user.findFirst({
    where: { username: 'guest' },
  })
  if (!guestUser) return false
  return guestUser
}

export const calculateCost = async ({
  queryTokens,
  responseTokens,
  provider,
  modelInstanceCuid,
  characters,
}) => {
  //console.log({
  //  function: 'calculateCost',
  //  queryTokens,
  //  responseTokens,
  //  provider,
  //  modelInstanceCuid,
  //  characters,
  //})
  const modelInstance = await db.modelInstance.findFirst({
    where: { cuid: modelInstanceCuid },
  })
  if (!modelInstance) return { error: 'No model instance found' }
  const aiProviders = providerSheet({ responseTokens, characters })[provider]
  if (!aiProviders) return { error: 'No provider found' }
  const modelSheet = aiProviders.models[modelInstance.model]
  if (!modelSheet) {
    return { error: `No model called "${modelInstance.model}" found` }
  }
  const cost = modelSheet.cost
  if (!cost) return { error: 'No cost found' }
  // set total cost to have 2 decimal places
  let preciseCost = cost * (queryTokens + responseTokens)
  let totalCost = Math.round(preciseCost * 100) / 100
  return totalCost
}
export const logRequest = async (request) => {
  let userCuid = request.userCuid
  let provider = request.provider || 'openAi'
  const {
    queryTokens,
    responseTokens,
    modelInstanceCuid,
    prompt,
    response,
    action,
  } = request
  if (request.error) return { error: request.error }
  console.log({ function: 'logRequest', request })
  if (!userCuid) {
    userCuid = await getGuestUser().cuid
    if (!userCuid) return { error: 'No userCuid provided || No guest' }
  }
  if (!queryTokens) return { error: 'No queryTokens provided' }
  if (!responseTokens) return { error: 'No responseTokens provided' }
  if (!modelInstanceCuid) return { error: 'No modelInstanceCuid provided' }
  if (!prompt) return { error: 'No prompt provided' }
  if (!response) return { error: 'No response provided' }
  if (!action) return { error: 'No action provided' }
  let cost = await calculateCost({
    queryTokens,
    responseTokens,
    provider,
    modelInstanceCuid,
    characters: prompt.length,
  })
  if (cost?.error) return { error: cost.error }
  let activityDetails = {
    userCuid,
    queryTokens,
    responseTokens,
    modelInstanceCuid,
    action,
    cost,
    price: cost * 4,
  }
  const activity = await saveActivity({ userCuid, activity: activityDetails })
  // if user has opted to save their requests, save them
  // if user has opted to save their requests, save them
  let saveRequests = await getPreference(userCuid, 'saveRequests')
  if (saveRequests == 'true') {
    //let questionToSave =
    await saveQuestion(userCuid, prompt, response)
  }
  // return "saved question and activity" conditionally
  return { activity }
}
export const respond = ({ statusCode, data }) => {
  //console.log({ statusCode, data })
  return {
    statusCode: statusCode || 418,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, authorization',
      'Access-Control-Allow-Methods': 'POST',
    },
    body: JSON.stringify(data),
  }
}
export const authenticateUser = async (event) => {
  // if authorization header is not provided, return 401
  let authorization = event?.headers?.authorization
  if (!authorization) return { error: 'No authorization header' }
  const token = authorization.replace('Basic ', '')
  //let [username, extensionKey] = new Buffer(token, 'base64')
  //  .toString()
  //  .split(':')
  // user safe buffer
  let [username, extensionKey] = Buffer.from(token, 'base64')
    .toString()
    .split(':')
  if (!username) return { error: 'No username provided' }
  if (!extensionKey) return { error: 'No extensionKey provided' }
  let where = { AND: [{ username }, { extensionKey }] }
  let user = await db.user.findFirst({ where })
  if (!user) return { error: 'No user found' }
  return user
}

export let success = (message) => {
  return respond({ statusCode: 200, data: { message } })
}
export let error = (message) => {
  return respond({ statusCode: 500, data: { error: message } })
}
export let isOptionRequest = (event) => event.httpMethod == 'OPTIONS'
export let isNotPostRequest = (event) => event.httpMethod !== 'POST'
export let isMissingBody = (event) => !event.body
export let parseBody = (event) => JSON.parse(event.body || null)
export let expectedFields = [
  'input',
  'prompt',
  'action',
  'table',
  'type',
  'suffix',
  'field',
  'provider',
  'model',
]
export let setBodyDefaults = (parsedBody) => {
  for (let field of expectedFields) {
    parsedBody[field] = parsedBody[field] || ''
  }
  if (!parsedBody.provider) parsedBody.provider = 'openAi'
  if (!parsedBody.model) parsedBody.model = 'text-curie-001'
  return parsedBody
}
export let promptMissing = (promptConfig) => !promptConfig || promptConfig.error
export let promptRequirementIsMissing = (parsedBody, promptConfig) => {
  let requiredFields = promptConfig.required
  if (!requiredFields) return false
  if (!requiredFields.length) return false
  // loop
  for (
    let requiredFieldCount = 0;
    requiredFieldCount < requiredFields.length;
    requiredFieldCount++
  ) {
    let field = requiredFields[requiredFieldCount]
    let parsedBodyField = parsedBody[field]
    let typeOfField = typeof parsedBodyField
    if (typeOfField === 'undefined') {
      return field
    }
  }
  return false
}
export let getTextCompletion = async ({
  promptConfig,
  parsedBody,
  userCuid,
}) => {
  console.log({ function: 'getTextCompletion', promptConfig })
  let response = await fetch(promptConfig.endpoint, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      authorization: await getProperty('OPENAI_API_KEY'),
    },
    body: JSON.stringify({ ...promptConfig.ai }),
  })
  let data = await response.json()
  console.log({ function: 'getTextCompletion', data })
  let queryTokens = data?.usage?.prompt_tokens
  let responseTokens = data?.usage?.completion_tokens
  let responseText = () => {
    if (data?.error) return data.error
    let text = data?.choices?.[0]?.text
    if (promptConfig?.prepend) return `${promptConfig.prepend}${text}`
    return text
  }
  let log = await logRequest({
    userCuid,
    provider: promptConfig.provider,
    queryTokens,
    responseTokens,
    modelInstanceCuid: promptConfig.modelInstance,
    action: parsedBody.action,
    prompt: (() => {
      if (parsedBody.action == 'explain') {
        return `explain\n${promptConfig.ai.prompt}`
      }
      return parsedBody.prompt
    })(),
    response: responseText(),
  })
  if (log?.error) return { error: log.error }
  return responseText().trim()
}
