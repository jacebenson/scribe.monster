import fetch from 'node-fetch'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
let dog = (props) => {
  console.log({ function: 'scribe', props })
}
//import prompts from 'src/lib/prompts'
import prompts from 'src/lib/promptDB'
import { log } from 'src/lib/util'
const AUTH = process.env.OPENAITOKEN

function respond({ code, data }) {
  return {
    statusCode: code || 418,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, authorization',
      'Access-Control-Allow-Methods': 'POST',
    },
    body: JSON.stringify(data),
  }
}
function respondError(error) {
  respond({ code: 500, data: { error } })
}
function respondFailedAuth(error) {
  respond({ code: 401, data: { error } })
}
export const handler = async (event /*, context*/) => {
  try {
    logger.info('Invoked scribe function')
    logger.info('body', event.body)
    let method = event.httpMethod
    let body = event.body || null
    if (method == 'OPTIONS') {
      return respond({ code: 200, data: { message: 'success' } })
    }
    if (!body) return respondError({ error: 'Missing JSON Body' })
    if (method !== 'POST') {
      return respondError({ error: 'We expect a POST' })
    }
    let parsedBody = JSON.parse(body)
    let coercedBody = {
      input: parsedBody?.input || '',
      prompt: parsedBody?.prompt || '',
      action: parsedBody?.action || '',
      table: parsedBody?.table || '',
      type: parsedBody?.type || '',
    }
    let promptConfig = await prompts({ ...coercedBody }) //[coercedBody.action]
    //console.log({ promptConfig })
    if (!promptConfig) {
      let error = 'Action invalid, try, edit, complete, or explain.'
      return respond({ code: 500, data: { error } })
    }
    console.log({ message: 'before required fields' })
    for (
      let requiredFieldCount = 0;
      requiredFieldCount < promptConfig.required.length;
      requiredFieldCount++
    ) {
      let field = promptConfig.required[requiredFieldCount]
      console.log({ field })
      let parsedBodyField = parsedBody[field]
      console.log({ parsedBodyField })
      let typeOfField = typeof parsedBodyField
      console.log({ typeOfField })
      if (typeOfField === 'undefined') {
        let error = `Missing ${promptConfig.required[requiredFieldCount]}`
        return respond({ code: 500, data: { error } })
      }
    }

    // post is good.  now lets see if the user can auth...
    if (!event.headers.authorization) {
      return respondFailedAuth({ error: 'No Authentication sent' })
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
    if (!hasValidKey) {
      return respond({ code: 401, data: { error: 'Key not valid' } })
    }
    console.log({ ai: promptConfig.ai })
    if (!promptConfig.ai.prompt) {
      respond({ code: 500, error: 'CRAP' })
    }
    const response = await fetch(promptConfig.endpoint, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTH,
      },
      body: JSON.stringify({ ...promptConfig.ai }),
    })
    const data = await response.json()
    if (data?.usage?.total_tokens) {
      await log(
        `${username} used ${data.usage.total_tokens}`,
        `/functions/scribe`
      )
    }
    let code = (function () {
      if (promptConfig?.prepend) {
        return promptConfig?.prepend + data?.choices?.[0]?.text
      }
      return data?.choices?.[0]?.text
    })()
    return respond({
      code: 200,
      data: {
        code,
        //code: data?.choices?.[0]?.text,
        tokens: data?.usage?.total_tokens,
        raw: { ...data },
        config: {
          required: promptConfig.required,
          about: '',
        },
      },
    })
  } catch (error) {
    console.log(error)
    return respondError({ error: 'Failed fetching data' })
  }
}
