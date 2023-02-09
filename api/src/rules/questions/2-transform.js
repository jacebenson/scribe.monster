import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { getVector, rephraseQuestion } from 'src/lib/openAIHelper'
module.exports = {
  active: true,
  order: 200,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'question',
  file: __filename,
  command: async function ({ data, status }) {
    console.log('::: 2-transform.js :::')
    try {
      // first we're going to rephrase the question
      //
      // look at the 3 recent questions for this thread
      // if there are any, then we'll rephrase the question
      let where = { threadCuid: data.threadCuid }
      let orderBy = { createdAt: 'desc' }
      let take = 3
      let select = {
        text: true,
        rephrasedText: true,
        answer: true,
        threadCuid: true,
      }
      console.log({ where, orderBy, take, select })
      let recentQuestions = await db.question.findMany({
        where,
        orderBy,
        take,
        select,
      })
      console.log('recentQuestions', recentQuestions)
      if (recentQuestions?.length > 0) {
        // look up the procedure for rephrasing the question
        // with pronouns
        let modifyQuestionMemory = await db.memory.findFirst({
          where: { title: 'Modify Prompt to Include Pronouns' },
          select: { content: true },
          take: 1,
        })
        console.log({
          modifyQuestionMemory: JSON.stringify(
            modifyQuestionMemory,
            null,
            '  '
          ),
        })
        data.rephrasedText = await rephraseQuestion({
          question: data.text,
          recentQuestions,
        })
        // now we need to vectorize the rephrased question
      } else {
        data.rephrasedText = data.text
      }
      let vector = await getVector(data.rephrasedText)
      data.rephrasedTextVector = JSON.stringify(vector.embedding)
      //data.rephrasedTextVector = data.rephrasedTextVector.length
      console.log({
        rephrasedTextVectorLength: data.rephrasedTextVector.length,
        rephrasedText: data.rephrasedText,
      })
      return { data, status }
    } catch (e) {
      logger.error(e)
    }
    return { data, status }
  },
}
