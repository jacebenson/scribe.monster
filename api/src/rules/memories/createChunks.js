import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import marked from 'marked'
import { chunkData, getVector } from 'src/lib/openAIHelper'
import { getProperty } from 'src/lib/util'

let createChunk = async ({ chunk, data, memoryCuid, title }) => {
  // if active is false, exit
  if (data?.active === false) {
    return { cuid, data }
  }
  console.log('::: createChunks.js :::')

  // if no openai api key, exit
  if (!process.env.OPENAITOKEN) {
    console.log('::: createChunks.js ::: no openai api key')
    return { cuid, data }
  }
  let vector = await getVector(chunk)
  let memoryChunk = {
    memoryCuid,
    title,
    content: chunk,
    vector: JSON.stringify(vector.embedding),
  }
  console.log({ message: 'creating chunk ', memoryChunkTitle: memoryChunk.title })
  let chunkCreated = await db.memoryChunk.create({ data: memoryChunk })
  chunkCreated = { ...chunkCreated, vector: 'vector not shown' }
  console.log({ chunkCreated })
  return chunkCreated
}


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
      let memoryCuid = data?.cuid || cuid
      console.log({ function: '::: createChunks.js :::', memoryCuid, data, status })

      if (memoryCuid) {

        let oldContent = await db.memory.findFirst({
          where: { cuid: memoryCuid },
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
        await db.memoryChunk.deleteMany({ where: { memoryCuid } })
      }

      // if active is false, exit
      if (data?.active === false) return { cuid, data, status }
      if (!process.env.OPENAITOKEN) {
        status = { code: 'error', message: 'OpenAI Token not set' }
        return { cuid, data, status }
      }
      console.log('::: createChunks.js :::')

      // lets see if the text is markdown or plain text
      // we'll do this by looking for # and ## headings
      let markdown = false
      // line by line
      let lines = data.content.split('\n')
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        if (line.startsWith('#')) {
          markdown = true
          break
        }
      }
      if (markdown) {
        // TODO: use markdown parser to break by headings
        let markdownTokens = marked.lexer(data.content)
        let markdownHeadings = markdownTokens.filter(token => token.type === 'heading')
        // for each, heading create a chunk
        for (let i = 0; i < markdownHeadings.length; i++) {
          let heading = markdownHeadings[i]
          let nextHeading = markdownHeadings[i + 1]
          let headingPosition = data.content.indexOf(heading.raw)
          let nextHeadingPosition = data.content.indexOf(nextHeading?.raw)
          // lets get the content between the headings
          console.log({
            heading,
            nextHeading,
            headingPosition,
            nextHeadingPosition
          })

          let chunk = data.content.substring(headingPosition, nextHeadingPosition)
          // what if there is no next heading?
          if(!nextHeading){
            chunk = data.content.substring(headingPosition)
          }
          // lets create the chunk
          let chunkCreated = await createChunk({
            chunk,
            data,
            memoryCuid,
            title: `${data.title} - ${i + 1} - ${heading.text}`,
          })
          console.log({ ...chunkCreated, vector: 'vector not shown' })
        }
      }
      if (!markdown) {
        // not markdown, so break by chunks of 1k characters
        let chunkSize = 1000
        let chunkData = (data) => {
          let chunks = []
          let chunk = ''
          let lines = data.split('\n')
          for (let i = 0; i < lines.length; i++) {
            let line = lines[i]
            if (chunk.length + line.length > chunkSize) {
              chunks.push(chunk)
              chunk = ''
            }
            chunk += line + '\n'
          }
          chunks.push(chunk)
          return chunks
        }
        let chunks = chunkData(data.content)
        for (let i = 0; i < chunks.length; i++) {
          let chunk = chunks[i]
          let chunkCreated = await createChunk({
            chunk,
            data,
            memoryCuid,
            title: `${data.title} - ${i + 1}`,
          })
          console.log({ ...chunkCreated, vector: 'vector not shown' })
        }
      }




    } catch (e) {
      logger.error(e)
    }
    return await { cuid, data, status }
  },
}
