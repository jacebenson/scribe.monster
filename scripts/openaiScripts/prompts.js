let prompts = ({ table, data }) => {
  let returnPrompts = {}
  if (!data) return { function: 'prompts no data', returnPrompts }
  if (!table) return { function: 'prompts no table', returnPrompts }
  if (table == 'sys_script') {
    returnPrompts = {
      prompt: data?.name,
      table: data?.collection,
      when: data?.when,
      actions: (() => {
        // return crud for the actions
        let actions = []
        if (data?.action_insert == 'true') actions.push('c')
        if (data?.action_query == 'true') actions.push('r')
        if (data?.action_update == 'true') actions.push('u')
        if (data?.action_delete == 'true') actions.push('d')
        return actions.join('')
      })(),
      //advanced: data?.advanced,//only set 50 times
    }
  }
  return returnPrompts
}

export default prompts
