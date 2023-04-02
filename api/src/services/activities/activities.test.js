import {
  activities,
  activity,
  createActivity,
  updateActivity,
  deleteActivity,
} from './activities'

describe('activities', () => {
  scenario('returns all activities', async (scenario) => {
    const result = await activities()

    expect(result.length).toEqual(Object.keys(scenario.activity).length)
  })

  scenario('returns a single activity', async (scenario) => {
    const result = await activity({ cuid: scenario.activity.one.id })

    expect(result).toEqual(scenario.activity.one)
  })

  scenario('creates a activity', async (scenario) => {
    const result = await createActivity({
      input: {
        updatedAt: '2023-04-02T17:37:40.564Z',
        queryTokens: 8421332,
        responseTokens: 6098137,
        modelInstanceCuid: scenario.activity.two.modelInstanceCuid,
        cost: 3130821.3280541096,
        price: 9579431.546355646,
        userCuid: scenario.activity.two.userCuid,
        action: 'String',
      },
    })

    expect(result.updatedAt).toEqual('2023-04-02T17:37:40.564Z')
    expect(result.queryTokens).toEqual(8421332)
    expect(result.responseTokens).toEqual(6098137)
    expect(result.modelInstanceCuid).toEqual(
      scenario.activity.two.modelInstanceCuid
    )

    expect(result.cost).toEqual(3130821.3280541096)
    expect(result.price).toEqual(9579431.546355646)
    expect(result.userCuid).toEqual(scenario.activity.two.userCuid)
    expect(result.action).toEqual('String')
  })

  scenario('updates a activity', async (scenario) => {
    const original = await activity({ cuid: scenario.activity.one.cuid })
    const result = await updateActivity({
      cuid: original.cuid,
      input: { updatedAt: '2023-04-03T17:37:40.564Z' },
    })

    expect(result.updatedAt).toEqual('2023-04-03T17:37:40.564Z')
  })

  scenario('deletes a activity', async (scenario) => {
    const original = await deleteActivity({ cuid: scenario.activity.one.cuid })
    const result = await activity({ cuid: original.cuid })

    expect(result).toEqual(null)
  })
})
