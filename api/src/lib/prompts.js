const strip = require('strip-comments')
export const prompts = ({ prompt, input }) => {
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
      required: ['input', 'instruction', 'action'],
      about: 'This will edit the script.',
    },
    complete: {
      ai: {
        prompt: `${input}
"""
Rewite the code above based on this prompt, "${prompt}.":
`,
        model: 'text-davinci-002',
        temperature: 1,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      endpoint: 'https://api.openai.com/v1/completions',
      required: ['instruction', 'input', 'action'],
      about:
        'This will complete the script based on the code in the first line.',
    },
    explain: {
      ai: {
        prompt: `"""
${strip(input)}
"""
Explain this above code:
1.`,
        model: 'text-davinci-002',
        temperature: 0.7,
        max_tokens: 400,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      endpoint: 'https://api.openai.com/v1/completions',
      required: ['input', 'action'],
      about: 'This explains the code in a list.',
    },
  }
}
export default prompts
