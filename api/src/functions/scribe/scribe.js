import fetch from 'node-fetch'

import { db } from 'src/lib/db'
//import { logger } from 'src/lib/logger'
import prompts from 'src/lib/promptDB'
//import { log } from 'src/lib/util'
import { createScribeRequest } from 'src/services/scribeRequests/scribeRequests'

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
export const handler = async (event /*, context*/) => {
  try {
    console.log('Invoked scribe function')
    console.log('body', event.body)
    //console.log('context', context)
    console.log('event.httpMethod', event.httpMethod)
    console.log('event.headers', event.headers)

    let method = event.httpMethod
    let body = event.body || null
    //let allowedOrigins = [
    //  'chrome-extension://jdibjdmndifkeafbhbajogekgeolmmfh',
    //  'http://localhost:8910',
    //  'http://scribe.monster',
    //]
    //// if origin is not allowed, return 403
    //if (allowedOrigins.indexOf(event.headers.origin) === -1) {
    //  return respond({ code: 403, data: { error: 'Origin not allowed' } })
    //}
    if (method == 'OPTIONS') {
      return respond({ code: 200, data: { message: 'success' } })
    }
    if (!body) {
      return respond({ code: 500, data: { error: 'Missing JSON Body' } })
    }
    if (method !== 'POST') {
      return respond({ code: 500, data: { error: 'We expect a POST' } })
    }
    let parsedBody = JSON.parse(body)
    let coercedBody = {
      input: parsedBody?.input || '',
      prompt: parsedBody?.prompt || '',
      action: parsedBody?.action || '',
      table: parsedBody?.table || '',
      type: parsedBody?.type || '',
      suffix: parsedBody?.suffix || '',
      field: parsedBody?.field || '',
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
      //console.log({ field })
      let parsedBodyField = parsedBody[field]
      //console.log({ parsedBodyField })
      let typeOfField = typeof parsedBodyField
      //console.log({ typeOfField })
      if (typeOfField === 'undefined') {
        let error = `Missing ${promptConfig.required[requiredFieldCount]}`
        return respond({ code: 500, data: { error } })
      }
    }

    // post is good.  now lets see if the user can auth...
    if (!event.headers.authorization) {
      return respond({ code: 401, data: { error: 'No Authentication sent' } })
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
    var user = await db.user.findFirst({
      where,
    })
    if (!user) {
      return respond({ code: 401, data: { error: 'Key not valid' } })
    }
    // lets look for a prompt that matches
    let promptLookup = await db.prompt.findFirst({
      where: {
        prompt: promptConfig.ai.prompt,
        action: coercedBody.action,
      },
    })
    // if we find one, use it
    if (promptLookup) {
      await createScribeRequest({
        input: {
          userId: user.id,
          modelInstanceId: promptConfig.modelInstance,
          queryTokens: 0,
          responseTokens: 0,
        },
      })
      return respond({
        code: 200,
        data: {
          code: promptLookup.response + '\n// Generated by scribe.monster',
        },
      })
    }
    //console.log({ ai: promptConfig.ai })
    // if user prefers to save prompts, save it
    let savePrompt = await db.preference.findFirst({
      where: {
        userId: user.id,
        entity: 'savePrompts',
      },
    })

    let promptID = null
    if (savePrompt?.value === 'true' || true) {
      let promptToSave = await db.prompt.create({
        data: {
          user: { connect: { id: user.id } },
          prompt: promptConfig.ai.prompt,
          action: coercedBody.action,
        },
      })
      console.log({ promptToSave })
      promptID = promptToSave.id
    }
    // if user prefers to save requests

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
    let totalTokens = data?.usage?.total_tokens
    let promptTokens = data?.usage?.prompt_tokens
    let completionTokens = data?.usage?.completion_tokens
    //console.log({ function: 'scribe post fetch', data })
    if (totalTokens) {
      //await log(
      //  `${username},${coercedBody.action},${coercedBody.table},${totalTokens}`,
      //  `/functions/scribe`
      //)
      //await db.scribeRequest.create()
      let input = {
        userId: user.id,
        modelInstanceId: promptConfig.modelInstance,
        queryTokens: promptTokens,
        responseTokens: completionTokens,
      }
      //console.log({ input })
      await createScribeRequest({ input })
    }
    let code = (function () {
      if (promptConfig?.prepend) {
        return promptConfig?.prepend + data?.choices?.[0]?.text
      }
      return data?.choices?.[0]?.text
    })()
    // if savePrompt is true, save the prompt
    if (savePrompt?.value === 'true') {
      let promptToUpdate = await db.prompt.update({
        where: {
          id: promptID,
        },
        data: {
          response: code,
        },
      })
      console.log({ promptToUpdate })
    }
    return respond({
      code: 200,
      data: {
        code: code + '\n// Generated by scribe.monster',
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
    return respond({ code: 500, data: { error: 'Failed fetching data' } })
  }
}
