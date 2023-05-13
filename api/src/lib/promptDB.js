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
  console.log({
    function: 'promptDB',
    props: { input, prompt, action, table, type },
  })
  let where = { name: action }
  let orderBy = { version: 'desc' }
  let instance = await db.modelInstance.findFirst({ where, orderBy })
  //console.log({ function: 'promptDB', instance })
  if (!instance) return { error: `No model found matching action '${action}'` }
  //  console.log({
  //    function: 'promptDB',
  //    prompt: prompt || null,
  //    dbFunc: instance?.prompt,
  //  })
  let prepend
  let context = vm.createContext({
    prompt,
    messages: null,
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
  //console.log({ context })
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
      modelInstance: instance.cuid,
      prepend: context?.prepend || '',
      provider: 'openAi',
    }
    if (context.messages) {
      console.log({
        function: 'promptDB',
        messages: JSON.stringify(context.messages),
      })
      returnObj.ai.messages = context.messages
      delete returnObj.ai.prompt
      delete returnObj.ai.suffix
    }
    //if (returnObj.endpoint === 'https://api.openai.com/v1/edits') {
    //  returnObj.ai.instruction = prompt
    //  delete returnObj.ai.frequency_penalty
    //  delete returnObj.ai.max_tokens
    //  delete returnObj.ai.presence_penalty
    //  delete returnObj.ai.prompt
    //  delete returnObj.ai.stop
    //  delete returnObj.ai.suffix
    //}
    //console.log({ function: 'promptDB', returnObj })
    return returnObj
  }
}
export default prompts
