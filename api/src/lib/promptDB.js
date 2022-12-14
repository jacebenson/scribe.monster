import { db } from './db'

const vm = require('node:vm')

const strip = require('strip-comments')
export const prompts = async ({ input, prompt, action, table, type }) => {
  //console.log({
  //  function: 'promptDB',
  //  props: { input, prompt, action, table, type },
  //})
  let instance = await db.modelInstance.findFirst({
    where: { name: action },
    orderBy: { version: 'desc' },
  })
  //console.log({ function: 'promptDB', instance })
  console.log({ function: 'promptDB', prompt, dbFunc: instance.prompt })
  let context = vm.createContext({
    prompt,
    input: input.toString(),
    table,
    action,
    type,
    model: instance.model,
  })
  let script = new vm.Script(instance.prompt)
  //vm.createContext({ promptContext })
  script.runInContext(context)
  console.log({ context })
  if (instance) {
    let returnObj = {
      ai: {
        prompt: context.prompt,
        model: context.model || instance.model,
        temperature: instance.temperature,
        max_tokens: instance.maxTokens,
        top_p: instance.topP,
        frequency_penalty: instance.frequencyPenalty,
        presence_penalty: instance.presencePenalty,
        stop: [instance.stop],
      },
      endpoint: instance.endpoint,
      about: instance.desciption,
      required: ['action'],
    }
    console.log({ function: 'promptDB', returnObj })
    return returnObj
  }
}
export default prompts
