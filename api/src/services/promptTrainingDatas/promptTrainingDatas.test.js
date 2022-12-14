import {
  promptTrainingDatas,
  promptTrainingData,
  createPromptTrainingData,
  updatePromptTrainingData,
  deletePromptTrainingData,
} from './promptTrainingDatas'

describe('promptTrainingDatas', () => {
  scenario('returns all promptTrainingDatas', async (scenario) => {
    const result = await promptTrainingDatas()

    expect(result.length).toEqual(
      Object.keys(scenario.promptTrainingData).length
    )
  })

  scenario('returns a single promptTrainingData', async (scenario) => {
    const result = await promptTrainingData({
      id: scenario.promptTrainingData.one.id,
    })

    expect(result).toEqual(scenario.promptTrainingData.one)
  })

  scenario('creates a promptTrainingData', async (scenario) => {
    const result = await createPromptTrainingData({
      input: {
        updatedAt: '2022-12-14T02:36:13.181Z',
        prompt: 'String',
        table: 'String',
        action: 'String',
        type: 'String',
        completion: 'String',
        userId: scenario.promptTrainingData.two.userId,
      },
    })

    expect(result.updatedAt).toEqual('2022-12-14T02:36:13.181Z')
    expect(result.prompt).toEqual('String')
    expect(result.table).toEqual('String')
    expect(result.action).toEqual('String')
    expect(result.type).toEqual('String')
    expect(result.completion).toEqual('String')
    expect(result.userId).toEqual(scenario.promptTrainingData.two.userId)
  })

  scenario('updates a promptTrainingData', async (scenario) => {
    const original = await promptTrainingData({
      id: scenario.promptTrainingData.one.id,
    })
    const result = await updatePromptTrainingData({
      id: original.id,
      input: { updatedAt: '2022-12-15T02:36:13.181Z' },
    })

    expect(result.updatedAt).toEqual('2022-12-15T02:36:13.181Z')
  })

  scenario('deletes a promptTrainingData', async (scenario) => {
    const original = await deletePromptTrainingData({
      id: scenario.promptTrainingData.one.id,
    })
    const result = await promptTrainingData({ id: original.id })

    expect(result).toEqual(null)
  })
})
