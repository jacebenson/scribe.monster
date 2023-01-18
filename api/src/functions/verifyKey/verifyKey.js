import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

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
    if (event.httpMethod !== 'GET') {
      return respond({
        code: 500,
        data: { error: 'We expect a GET' },
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
    // if users 'validatedAt' is null, then we need to update it
    var user = await db.user.findFirst({
      where,
    })
    if (!user.verifiedAt) {
      await db.user.update({
        where: { id: user.id },
        data: { verifiedAt: new Date() },
      })
    }

    return respond({
      code: 200,
      data: { message: 'success' },
    })
  } catch (error) {
    console.log(error)
    return respond({ code: 500, data: { error: 'Failed fetching data' } })
  }
}
