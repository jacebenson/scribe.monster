import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
let dog = console.log
import prompts from 'src/lib/prompts'
import { log } from 'src/lib/util'
const AUTH = process.env.OPENAITOKEN
function respond({ code, data }) {
  return {
    statusCode: code,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, authorization',
      'Access-Control-Allow-Methods': 'POST',
    },
    body: JSON.stringify(data),
  }
}
export const handler = async (event, context) => {
  try {
    logger.info('Invoked promptTraining function')
    logger.info('body', event.body)
    dog('event', event.httpMethod)
    if (event.httpMethod == 'OPTIONS') {
      return respond({
        code: 200,
        data: { message: 'This is allowed from all places' },
      })
    }
    if (event.httpMethod !== 'POST') {
      return respond({
        code: 500,
        data: { error: 'We expect a POST' },
      })
    }
    if (!event.body) {
      return respond({
        code: 500,
        data: { error: 'Missing JSON Body' },
      })
    }

    var body = JSON.parse(event?.body)
    var input = body?.input
    var prompt = body?.prompt
    var action = body?.action || 'edit'
    var table = body?.table
    var type = body?.type
    var completion = body?.completion
    dog({
      input,
      prompt,
      action,
      table,
      type,
      completion,
    })
    let promptConfig = prompts({ input, prompt, table, type })[action]
    if (!promptConfig) {
      return respond({
        code: 500,
        data: {
          error: 'Action invalid, try, edit, complete, or explain.',
        },
      })
    }
    dog({ promptConfig: promptConfig.required })
    for (
      let requiredFieldCount = 0;
      requiredFieldCount < promptConfig.required.length;
      requiredFieldCount++
    ) {
      let typeOfField = typeof body[promptConfig.required[requiredFieldCount]]
      if (typeOfField === 'undefined') {
        return respond({
          code: 500,
          data: {
            error: `Missing ${promptConfig.required[requiredFieldCount]}`,
          },
        })
      }
    }
    // post is good.  now lets see if the user can auth...
    if (!event.headers.authorization) {
      return respond({
        code: 401,
        data: { error: 'No Authentication sent' },
      })
    }
    var authString = event.headers.authorization.split('Basic ')[1]
    var [username, ...extensionKey] = new Buffer(authString, 'base64')
      .toString()
      .split(':')
    extensionKey = extensionKey.join(':')
    if (extensionKey === '') {
      return respond({ code: 401, data: { error: 'No password sent' } })
    }
    var where = {
      AND: [
        { extensionKey: { equals: extensionKey } },
        { username: { equals: username } },
        //{ level: { OR: [{ equals: 'paid' }, { equals: 'free' }] } },
      ],
    }
    var hasValidKey =
      (await db.user.count({
        where,
      })) === 1
    console.log({
      hasValidKey,
      where: JSON.stringify(where),
      headers: event.headers,
      authString,
      username,
      extensionKey,
    })
    if (!hasValidKey) {
      return respond({ code: 401, data: { error: 'Key not valid' } })
    }
    //TODO: create promptTrainingData
    let wherePrompt = {
      AND: [
        { prompt: { equals: '' } },
        { table: { equals: '' } },
        { action: { equals: '' } },
      ],
    }
    let dataPrompt = {
      prompt: promptConfig.ai.prompt,
      table,
      action,
      type,
      completion,
    }
    await db.promptTrainingData.upsert({ where: wherePrompt, dataPrompt })
    return respond({
      code: 200,
      data: {
        message: 'thank you',
      },
    })
  } catch (error) {
    logger.info('Error Caught promptTraining function')

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: 'promptTraining function',
        error,
      }),
    }
  }
}