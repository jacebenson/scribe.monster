const strip = require('strip-comments')
export const prompts = ({ input, prompt, action, table, type }) => {
  return {
    /*edit: {
      ai: {
        input: input,
        instruction: prompt,
        temperature: 0,
        model: 'code-davinci-edit-001',
      },
      endpoint: 'https://api.openai.com/v1/edits',
      required: ['input', 'instruction', 'action'],
      about: 'This will edit the script.',
    },*/
    edit: {
      ai: {
        prompt: `Update this code based following this prompt, "${prompt}":
${input}
\`\`\``,
        model: 'text-davinci-002',
        temperature: 0,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['```'],
      },
      endpoint: 'https://api.openai.com/v1/completions',
      required: ['input', 'prompt', 'action'],
      about: 'This will edit the script.',
    },
    complete: (() => {
      console.log({ function: 'complete' })
      if (table === 'catalog_script_client' || table === 'sys_script_client') {
        console.log({ function: 'complete', table })
        return {
          //client script
          ai: {
            model: 'curie:ft-scribemonster-2022-12-10-06-06-40',
            prompt: `action: ${action}\ntype: ${type}\nprompt: ${prompt}\nresponse:\n\n`,
            temperature: 0.3,
            max_tokens: 600,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ['END'],
          },
          endpoint: 'https://api.openai.com/v1/completions',
          required: ['type', 'prompt'],
          about:
            'This will complete the script based on just the prompt and the type.',
        }
      }
      console.log({ function: 'complete', original: 'true' })
      return {
        // everything else
        ai: {
          prompt: `${input}\n"""\nRewite the code above with verbose comments around the logic based on this prompt, "${prompt}.":\n${input.split(' ')[0]}`,
          model: 'text-davinci-002',
          temperature: 1,
          max_tokens: 500,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        prepend: input.split(' ')[0] + ' ',
        endpoint: 'https://api.openai.com/v1/completions',
        required: ['prompt', 'input', 'action'],
        about:
          'This will complete the script based on the code in the first line.',
      }
    })(),
    explain: (() => {
      var explainPrompt
      if (table === 'catalog_script_client') {
        explainPrompt = `${strip(
          input
        )}\n"""\nThis runs on the catalog form.\nExplain it like I'm five years old in the form of a list.\n1.`
      }
      if (table === 'sys_script_client') {
        explainPrompt = `${strip(
          input
        )}\n"""\nThe ${type} function runs on the form.\nExplain it like I'm five years old in the form of a list.\n1.`
      }
      if (table === 'sys_script') {
        explainPrompt = `${strip(
          input
        )}\n"""\ncurrent is tied to the ${table} record.\nExplain it like I'm five years old in the form of a list.\n1.`
      }
      if (table === 'sys_script_include') {
        explainPrompt = `${strip(
          input
        )}\n"""\nExplain this Script Include like I'm five years old in the form of a list.\n1.`
      }
      console.log({ function: 'prompts', table, explainPrompt })
      return {
        ai: {
          model: 'text-davinci-002',
          prompt: explainPrompt,
          temperature: 0.7,
          max_tokens: 400,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        endpoint: 'https://api.openai.com/v1/completions',
        required: ['input', 'action'],
        about: 'This explains the code in a list.',
      }
    })(),
    /*{
      ai: {
        model: 'text-davinci-002',
        prompt: `"""\n${strip(input)}\n"""\nExplain this above code:\n1.`,
        temperature: 0.7,
        max_tokens: 400,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      endpoint: 'https://api.openai.com/v1/completions',
      required: ['input', 'action'],
      about: 'This explains the code in a list.',
    },*/
  }
}
export default prompts
