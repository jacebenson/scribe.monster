import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { chunkData, getVector } from 'src/lib/openAIHelper'
import { getProperty } from 'src/lib/util'
module.exports = {
  active: true,
  order: 10,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'memory',
  file: __filename,
  command: async function ({ cuid, data, status }) {
    try {
      // when a memory is created or updated
      // and the content is changed
      // delete all the memory chunks for that memory
      // and then create new ones
      if (data?.cuid) {
        let oldContent = await db.memory.findFirst({
          where: { cuid: data.cuid },
          select: { content: true },
        })
        if (oldContent?.content === data.content) {
          // content has not changed, so we can exit
          console.log('::: createChunks.js ::: content has not changed')
          return { cuid, data, status }
        }
        console.log('::: createChunks.js ::: content changed', {
          oldContentData: oldContent,
          newContentData: data.content,
        })
        await db.memoryChunk.deleteMany({ where: { memoryCuid: data.cuid } })
      }

      // if active is false, exit
      if (data?.active === false) {
        return { cuid, data, status }
      }
      console.log('::: createChunks.js :::')

      // now we need to create the chunks
      // lets chunk it at each paragraph
      let content = data.content
      let pagahraphRegex = /(\n\n|\r\n)/g
      let chunks = content.split(pagahraphRegex)

      //let chunkSize = parseInt(getProperty('MEMORY_CHUNK_SIZE')) || 1000
      //let content = data.content
      //let chunks = chunkData(content, chunkSize)
      // now we just need to set memoryCuid, title, and vector
      let paragraphCount = 0
      for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i].trim()
        // if the chunk is empty, skip it
        if (chunk === '') {
          // fix the paragraph count
          continue
        }
        paragraphCount++
        let vector = await getVector(chunk)
        let memoryChunk = {
          memoryCuid: data.cuid || cuid,
          title: `${data.title} - Paragraph ${paragraphCount}`,
          content: chunk,
          vector: JSON.stringify(vector.embedding),
        }
        await db.memoryChunk.create({ data: memoryChunk })
      }

      // now we can do a bulk crete
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
      //console.log({ function: 'setVector', data })
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
