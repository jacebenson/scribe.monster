import { db } from './db'

const vm = require('node:vm')

export const prompts = async ({
  input,
  prompt,
  action,
  table,
  type,
  suffix,
  field,
}) => {
  //console.log({
  //  function: 'promptDB',
  //  props: { input, prompt, action, table, type },
  //})
  let where = { name: action }
  let orderBy = { version: 'desc' }
  console.log({ where, orderBy })
  let instance = await db.modelInstance.findFirst({ where, orderBy })
  //console.log({ function: 'promptDB', instance })
  if (!instance) throw 'No model with that name'
  console.log({
    function: 'promptDB',
    prompt: prompt || null,
    dbFunc: instance?.prompt,
  })
  let prepend
  let context = vm.createContext({
    prompt,
    input: input.toString(),
    table,
    action,
    type,
    model: instance.model,
    prepend,
    suffix,
    field,
    stop: instance.stop,
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
        stop: (() => {
          if (context.stop) return [context.stop]
          return [instance.stop]
        })(),
        suffix: instance.suffix || null,
      },
      endpoint: instance.endpoint,
      about: instance.desciption,
      required: ['action'],
      modelInstance: instance.id,
      prepend: context?.prepend || '',
    }
    console.log({ function: 'promptDB', returnObj })
    return returnObj
  }
}
export default prompts
