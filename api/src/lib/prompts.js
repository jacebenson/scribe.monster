export const prompts = ({ prompt, input }) => {
  return {
    edit: {
      prompt: `Update this given this prompt, "${prompt}":
${input}
\`\`\``,
      model: 'text-davinci-002',
      temperature: 0,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['```'],
    },
    complete: {
      prompt: `Code this given this prompt, "${prompt}":
${input.split('\n')[0]}`,
      model: 'text-davinci-002',
      temperature: 0,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    explain: {
      prompt: `${input}
"""
Here's what the code above does
1.`,
      model: 'text-curie-001',
      temperature: 0.7,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
  }
}
export default prompts
