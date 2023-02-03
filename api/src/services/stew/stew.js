import { UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import {
  getRecentQuestion,
  modifyQuestionWithPronouns,
  getVector,
  getMemoriesSortedByVector,
  answerMemory,
  filterMemories,
  addTokens,
  addCost,
  compareVectors,
  summarizeAllMemories,
  createThread,
} from 'src/lib/openAIHelper'

import { createQuestion, updateQuestion } from '../questions/questions'

export const stewQuestion = async ({ input }) => {
  console.log({ function: 'ask', input })
  /**
   * 1. Recall
   *    - (lookup my recent questions) // theres a  problem here... i get weird results
   * 2. Tranform
   *    - (modify the question with pronouns) // sometimes this doesnt work well
   *    - (vectorize/embedding the new question)
   * 3. Research
   *    - (lookup my memories sorted by vector)
   * 4. Summarize
   *    - (summarize the memories)
   * 5. Finding best results
   *    - (vectorize/embedding each summary)
   *    - (compare the vector of the summary to the vector of the question)
   *    - (return the best results)
   * 6. Combine the best results
   *    - (combine the best results into a single answer)
   * 7. Answer
   *   - (answer the question)
   */
  let currentStep
  try {
    let cost = {}
    let tokenUsage = {}
    let question = input.text
    let thread = input.thread
    if (!thread) thread = await createThread()
    console.log({ function: 'before Lookup', thread })
    let questionDB = await createQuestion({
      input: { text: question, thread: { connect: { cuid: thread.cuid } } },
    })
    //let questionDB = await db.question.create({
    //  data: {
    //    text: question,
    //    thread: { connect: { cuid: thread.cuid } },
    //  },
    //})
    /** 1.RECALL - Lookup My Recent Questions */
    currentStep = '1.RECALL - Lookup My Recent Questions'
    console.log(currentStep)
    let recentQuestions = await getRecentQuestion({ thread }) //in descending order
    console.log({ function: 'after Lookup', recentQuestions })
    /** 2.TRANSFORM - Rewite question to use proper pronouns */
    console.log('2.TRANSFORM - Rewite question to use proper pronouns')
    let questionWithPronouns = await modifyQuestionWithPronouns({
      question,
      recentQuestions,
    })
    /** 2.TRANSFORM - Vectorize the new question */
    currentStep = '2.TRANSFORM - Vectorize the new question'
    console.log(currentStep)
    //let textVectorData = await getVector(question)
    //let textVector = textVectorData.embedding
    let questionVectorData = await getVector(questionWithPronouns)
    let questionVector = questionVectorData.embedding
    //await updateQuestion({
    //  cuid: questionDB.cuid,
    //  input: {
    //    textVector: JSON.stringify(textVector),
    //    rephrasedText: questionWithPronouns,
    //    rephrasedTextVector: JSON.stringify(questionVector),
    //  },
    //})
    //tokenUsage = addTokens({
    //  tokenObj: tokenUsage,
    //  model: questionVectorData.model,
    //  tokens: questionVectorData.tokens,
    //})
    //cost = addCost({
    //  costObj: cost,
    //  model: questionVectorData.model,
    //  tokens: questionVectorData.tokens,
    //})
    // 3.RESEARCH - Lookup my memories sorted by vector and filter top 5 with 80%+
    /*     currentStep =
      '3.RESEARCH - Lookup my memories sorted by vector and filter top 5 with 80%+'
    console.log(currentStep)
    let memories = await getMemoriesSortedByVector(questionVector)
    memories = await filterMemories({ memories, quantity: 5, score: 75 })
    if (memories.length === 0) {
      return {
        question: questionWithPronouns || 'No question',
        context: 'hidden', //context || 'No context',
        answer: "I'm not sure.  I have no memories close enough to that.",
        cost: cost || {},
        tokenUsage: tokenUsage || {},
      }
    }
    // 4.SUMMARIZE - Summarize the memories
    currentStep = '4.SUMMARIZE - Summarize the memories'
    console.log(currentStep)
    let context = ''
    // now lets summarize the memories
    let arrayOfMemories = await summarizeAllMemories({
      memories,
      questionWithPronouns,
    })
    // now lets vectorize the memories to compare them to the question and keep the ones that are close
    let memoriesToKeep = arrayOfMemories.map(async (memory) => {
      let memoryVectorData = await getVector(memory)
      tokenUsage = addTokens({
        tokenObj: tokenUsage,
        model: memoryVectorData.model,
        tokens: memoryVectorData.tokens,
      })
      cost = addCost({
        costObj: cost,
        model: memoryVectorData.model,

        tokens: memoryVectorData.tokens,
      })
      // now compare the vector of the memory to the vector of the question
      let memoryVector = memoryVectorData.embedding
      let memoryScore = await compareVectors({
        vector1: memoryVector,
        vector2: questionVector,
      })
      console.log({
        scoreGT70: memoryScore > 70,
        memoryScore,
        memorySubStr: memory?.substr(0, 20),
      })
      // filter out the memories that are less than 80% similar

      if (memoryScore > 70) {
        return {
          memory,
          memoryScore,
        }
      }
      return null
    })
    // now lets sort the memories by score
    memoriesToKeep = await Promise.all(memoriesToKeep)
    memoriesToKeep = memoriesToKeep.filter((memory) => memory !== null)
    console.log({ memoriesToKeep })
    memoriesToKeep.sort((a, b) => {
      return b.memoryScore - a.memoryScore
    })
    // now lets combine the memories into a single context
    memoriesToKeep.forEach((memory) => {
      context += memory?.memory + '\n'
    })
    if (memoriesToKeep.length === 0) {
      return {
        question: questionWithPronouns || 'No question',
        context: 'hidden', //context || 'No context',
        answer: "I'm not sure.  I have no memories close enough to that.",
        cost: cost || {},
        tokenUsage: tokenUsage || {},
      }
    }

    let answer = await answerMemory({ question: questionWithPronouns, context })
    tokenUsage = await addTokens({
      tokenObj: tokenUsage,
      model: answer.model,
      tokens: answer.tokens,
    })
    // figure out the cost of the query
    // look over the token usage and add the cost
    for (let model in tokenUsage) {
      cost = addCost({ costObj: cost, model, tokens: tokenUsage[model] })
    }
    let record = {
      question: questionWithPronouns || 'No question',
      context: 'hidden', //context || 'No context',
      answer: answer.text || 'No answer',
      cost: cost || {},
      tokenUsage: tokenUsage || {},
    }
    return { ...record } */
  } catch (error) {
    console.log({ error })
    throw new UserInputError(currentStep)
  }
}
