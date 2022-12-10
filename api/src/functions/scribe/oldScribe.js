import fetch from 'node-fetch'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import prompts from 'src/lib/prompts'
import { log } from 'src/lib/util'
//const API_ENDPOINT = 'https://api.openai.com/v1/edits'
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
export const handler = async (event /*, context*/) => {
  try {
    logger.info('Invoked scribe function')
    logger.info('body', event.body)
    console.log('event', event.httpMethod)
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
    var instruction = body?.instruction
    var action = body?.action || 'edit'
    logger.info({
      input,
      instruction,
      action,
    })
    if (!input || !instruction || !action) {
      return respond({
        code: 500,
        data: {
          error: 'JSON Body missing input, instruction or action properties',
        },
      })
    }
    var prompt = prompts({ prompt: instruction, input })[action]
    console.log({ prompt })
    if (!prompt) {
      return respond({
        code: 500,
        data: {
          error: 'Action invalid, try, edit, complete, or explain.',
        },
      })
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
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTH,
      },
      body: JSON.stringify({ ...prompt }),
    })
    const data = await response.json()
    console.log({ data })

    await log(
      `${username} used ${data.usage.total_tokens}`,
      `/functions/scribe`
    )
    return respond({
      code: 200,
      data: { code: data.choices[0].text, tokens: data.usage.total_tokens },
    })
  } catch (error) {
    console.log(error)
    return respond({ code: 500, data: { error: 'Failed fetching data' } })
  }
}