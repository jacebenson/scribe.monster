import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
module.exports = {
  active: true,
  order: 10,
  when: ['after'],
  operation: ['update', 'create'],
  table: 'memory',
  file: __filename,
  command: async function ({ cuid, data, status }) {
    try {
      //exit if openai key is not set
      if (!process.env.OPENAITOKEN) {
        status = { code: 'error', message: 'OpenAI Token not set' }
        return { cuid, data, status }
      }
      // if active is false, exit
      if (!data?.active) {
        return { cuid, data, status }
      }
      // if content doesnt change exit
      // first we have to get the oldcontent
      console.log({ function: 'setVector', data })
      if (typeof cuid === 'string') {
        //if update, we need to get the old content
        let oldContent = await db.memory.findFirst({
          where: { cuid },
        })
        //console.log({ function: 'setVector', oldContent: oldContent?.content })
        if (data?.content === oldContent.content) {
          console.log({
            function: 'setVector',
            message: 'content didnt change',
          })
          return { cuid, data, status }
        }
      }
      console.log({ function: 'setVector', message: 'about to fetch data' })
      // now we can vectorize - aka - get the embedding of the content
      let response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.OPENAITOKEN}`,
        },
        body: JSON.stringify({
          input: data?.content,
          model: 'text-embedding-ada-002',
        }),
      })
      //console.log({ function: 'setVector', message: 'fetched data' })
      let vectorizedContent = await response.json()
      //console.log({ function: 'setVector', vectorizedContent })
      // now we can set the vectorized content
      //console.log({
      //  function: 'setVector',
      //  len: vectorizedContent.data.embeddings.length,
      //})
      data.vector = JSON.stringify(vectorizedContent.data[0].embedding)
      await db.memory.update({
        where: { cuid: cuid || data.cuid },
        data,
      })
      //console.log({ vectorizedContent })
    } catch (e) {
      logger.error(e)
    }
    return await { cuid, data, status }
  },
}
