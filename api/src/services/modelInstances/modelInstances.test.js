import {
  modelInstances,
  modelInstance,
  createModelInstance,
  updateModelInstance,
  deleteModelInstance,
} from './modelInstances'

describe('modelInstances', () => {
  scenario('returns all modelInstances', async (scenario) => {
    const result = await modelInstances()

    expect(result.length).toEqual(Object.keys(scenario.modelInstance).length)
  })

  scenario('returns a single modelInstance', async (scenario) => {
    const result = await modelInstance({ id: scenario.modelInstance.one.id })

    expect(result).toEqual(scenario.modelInstance.one)
  })

  scenario('creates a modelInstance', async () => {
    const result = await createModelInstance({
      input: {
        updatedAt: '2022-12-14T03:27:35.868Z',
        name: 'String5213143',
        prompt: 'String',
      },
    })

    expect(result.updatedAt).toEqual('2022-12-14T03:27:35.868Z')
    expect(result.name).toEqual('String5213143')
    expect(result.prompt).toEqual('String')
  })

  scenario('updates a modelInstance', async (scenario) => {
    const original = await modelInstance({ id: scenario.modelInstance.one.id })
    const result = await updateModelInstance({
      id: original.id,
      input: { updatedAt: '2022-12-15T03:27:35.868Z' },
    })

    expect(result.updatedAt).toEqual('2022-12-15T03:27:35.868Z')
  })

  scenario('deletes a modelInstance', async (scenario) => {
    const original = await deleteModelInstance({
      id: scenario.modelInstance.one.id,
    })
    const result = await modelInstance({ id: original.id })

    expect(result).toEqual(null)
  })
})
