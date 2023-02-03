import {
  questions,
  question,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from './questions'

describe('questions', () => {
  scenario('returns all questions', async (scenario) => {
    const result = await questions()

    expect(result.length).toEqual(Object.keys(scenario.question).length)
  })

  scenario('returns a single question', async (scenario) => {
    const result = await question({ cuid: scenario.question.one.id })

    expect(result).toEqual(scenario.question.one)
  })

  scenario('creates a question', async (scenario) => {
    const result = await createQuestion({
      input: {
        updatedAt: '2023-02-01T02:35:24.112Z',
        text: 'String',
        threadCuid: scenario.question.two.threadCuid,
      },
    })

    expect(result.updatedAt).toEqual('2023-02-01T02:35:24.112Z')
    expect(result.text).toEqual('String')
    expect(result.threadCuid).toEqual(scenario.question.two.threadCuid)
  })

  scenario('updates a question', async (scenario) => {
    const original = await question({ cuid: scenario.question.one.cuid })
    const result = await updateQuestion({
      cuid: original.cuid,
      input: { updatedAt: '2023-02-02T02:35:24.113Z' },
    })

    expect(result.updatedAt).toEqual('2023-02-02T02:35:24.113Z')
  })

  scenario('deletes a question', async (scenario) => {
    const original = await deleteQuestion({ cuid: scenario.question.one.cuid })
    const result = await question({ cuid: original.cuid })

    expect(result).toEqual(null)
  })
})
