import fetch from 'node-fetch'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const API_ENDPOINT = 'https://api.openai.com/v1/edits'
const AUTH = process.env.OPENAITOKEN
/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
function respond({ code, data }) {
  return {
    statusCode: code,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      //'Access-Control-Allow-Headers': 'Content-Type',
      //'Access-Control-Allow-Methods': 'POST',
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
    var model = body?.model || 'code-davinci-edit-001'
    // code-davinci-edit-001
    // text-davinci-edit-001
    logger.info({
      input,
      instruction,
    })
    if (!input) {
      return respond({
        code: 500,
        data: { error: 'JSON Body missing `input` property' },
      })
    }
    if (!instruction) {
      return respond({
        code: 500,
        data: { error: 'JSON Body missing `instruction` property' },
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
    var [username, extensionKey] = new Buffer(authString, 'base64')
      .toString()
      .split(':')
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
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTH,
      },
      body: JSON.stringify({
        model,
        input,
        instruction,
      }),
    })
    const data = await response.json()
    console.log({ data })
    return respond({
      code: 200,
      data: { code: data.choices[0].text, tokens: data.usage.total_tokens },
    })
  } catch (error) {
    console.log(error)
    return respond({ code: 500, data: { error: 'Failed fetching data' } })
  }
}
