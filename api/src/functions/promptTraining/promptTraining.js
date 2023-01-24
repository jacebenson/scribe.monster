import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
let dog = console.log
import prompts from 'src/lib/prompts'

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
export const handler = async (event /*, context*/) => {
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
    var user = await db.user.findFirst({
      where: {
        AND: [
          { username: { equals: username } },
          { extensionKey: { equals: extensionKey } },
        ],
      },
    })
    console.log({ user })
    /*console.log({
      hasValidKey,
      where: JSON.stringify(where),
      headers: event.headers,
      authString,
      username,
      extensionKey,
    })*/
    if (!user) {
      return respond({ code: 401, data: { error: 'Key not valid' } })
    }
    let promptWhere = {
      AND: [
        { prompt: { equals: prompt } },
        { table: { equals: table } },
        { action: { equals: action } },
      ],
    }
    let promptData = {
      prompt: promptConfig.ai.prompt,
      table,
      action,
      type,
      completion: completion,
      userId: user.id,
    }
    console.log({ promptWhere, promptData })
    var promptTraining = await db.promptTrainingData.findFirst({
      where: promptWhere,
    })
    if (!promptTraining) {
      //not found
      var promptTrainingInsert = await db.promptTrainingData.create({
        data: promptData,
      })
      console.log({ promptTrainingInsert })
      return respond({
        code: 200,
        data: {
          promptTrainingInsert,
        },
      })
    }
    console.log({ promptTraining })
    //var upsertStatus = await db.promptTrainingData.upsert({
    //  where: promptWhere,
    //  update: promptData,
    //  create: promptData,
    //})
    //console.log({ upsertStatus })
    return respond({
      code: 200,
      data: {
        promptTraining,
      },
    })
  } catch (error) {
    console.log({ error })
    return respond({ code: 500, data: { error: 'Failed fetching data' } })
  }
}
