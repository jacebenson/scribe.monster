import {
  scribeRequests,
  scribeRequest,
  createScribeRequest,
  updateScribeRequest,
  deleteScribeRequest,
} from './scribeRequests'

describe('scribeRequests', () => {
  scenario('returns all scribeRequests', async (scenario) => {
    const result = await scribeRequests()

    expect(result.length).toEqual(Object.keys(scenario.scribeRequest).length)
  })

  scenario('returns a single scribeRequest', async (scenario) => {
    const result = await scribeRequest({ id: scenario.scribeRequest.one.id })

    expect(result).toEqual(scenario.scribeRequest.one)
  })

  scenario('creates a scribeRequest', async (scenario) => {
    const result = await createScribeRequest({
      input: {
        updatedAt: '2022-12-14T20:50:26.565Z',
        userId: scenario.scribeRequest.two.userId,
        modelInstanceId: scenario.scribeRequest.two.modelInstanceId,
      },
    })

    expect(result.updatedAt).toEqual('2022-12-14T20:50:26.565Z')
    expect(result.userId).toEqual(scenario.scribeRequest.two.userId)
    expect(result.modelInstanceId).toEqual(
      scenario.scribeRequest.two.modelInstanceId
    )
  })

  scenario('updates a scribeRequest', async (scenario) => {
    const original = await scribeRequest({ id: scenario.scribeRequest.one.id })
    const result = await updateScribeRequest({
      id: original.id,
      input: { updatedAt: '2022-12-15T20:50:26.565Z' },
    })

    expect(result.updatedAt).toEqual('2022-12-15T20:50:26.565Z')
  })

  scenario('deletes a scribeRequest', async (scenario) => {
    const original = await deleteScribeRequest({
      id: scenario.scribeRequest.one.id,
    })
    const result = await scribeRequest({ id: original.id })

    expect(result).toEqual(null)
  })
})
