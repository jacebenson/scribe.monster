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
    const result = await scribeRequest({
      cuid: scenario.scribeRequest.one.cuid,
    })

    expect(result).toEqual(scenario.scribeRequest.one)
  })

  scenario('creates a scribeRequest', async (scenario) => {
    const result = await createScribeRequest({
      input: {
        updatedAt: '2022-12-14T20:50:26.565Z',
        userCuid: scenario.scribeRequest.two.userCuid,
        modelInstanceId: scenario.scribeRequest.two.modelInstanceId,
      },
    })

    expect(result.updatedAt).toEqual('2022-12-14T20:50:26.565Z')
    expect(result.userCuid).toEqual(scenario.scribeRequest.two.userCuid)
    expect(result.modelInstanceId).toEqual(
      scenario.scribeRequest.two.modelInstanceId
    )
  })

  scenario('updates a scribeRequest', async (scenario) => {
    const original = await scribeRequest({
      cuid: scenario.scribeRequest.one.cuid,
    })
    const result = await updateScribeRequest({
      cuid: original.cuid,
      input: { updatedAt: '2022-12-15T20:50:26.565Z' },
    })

    expect(result.updatedAt).toEqual('2022-12-15T20:50:26.565Z')
  })

  scenario('deletes a scribeRequest', async (scenario) => {
    const original = await deleteScribeRequest({
      cuid: scenario.scribeRequest.one.cuid,
    })
    const result = await scribeRequest({ cuid: original.cuid })

    expect(result).toEqual(null)
  })
})
