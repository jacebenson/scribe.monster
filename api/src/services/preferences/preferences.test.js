import {
  preferences,
  preference,
  createPreference,
  updatePreference,
  deletePreference,
} from './preferences'

describe('preferences', () => {
  scenario('returns all preferences', async (scenario) => {
    const result = await preferences()

    expect(result.length).toEqual(Object.keys(scenario.preference).length)
  })

  scenario('returns a single preference', async (scenario) => {
    const result = await preference({ cuid: scenario.preference.one.cuid })

    expect(result).toEqual(scenario.preference.one)
  })

  scenario('creates a preference', async (scenario) => {
    const result = await createPreference({
      input: {
        updatedAt: '2022-01-15T22:17:11Z',
        entity: 'String',
        userCuid: scenario.preference.two.userCuid,
      },
    })

    expect(result.updatedAt).toEqual('2022-01-15T22:17:11Z')
    expect(result.entity).toEqual('String')
    expect(result.userCuid).toEqual(scenario.preference.two.userCuid)
  })

  scenario('updates a preference', async (scenario) => {
    const original = await preference({ cuid: scenario.preference.one.cuid })
    const result = await updatePreference({
      cuid: original.cuid,
      input: { updatedAt: '2022-01-16T22:17:11Z' },
    })

    expect(result.updatedAt).toEqual('2022-01-16T22:17:11Z')
  })

  scenario('deletes a preference', async (scenario) => {
    const original = await deletePreference({
      cuid: scenario.preference.one.cuid,
    })
    const result = await preference({ cuid: original.cuid })

    expect(result).toEqual(null)
  })
})
