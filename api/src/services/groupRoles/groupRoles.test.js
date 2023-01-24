import {
  groupRoles,
  groupRole,
  createGroupRole,
  updateGroupRole,
  deleteGroupRole,
} from './groupRoles'

describe('groupRoles', () => {
  scenario('returns all groupRoles', async (scenario) => {
    const result = await groupRoles()

    expect(result.length).toEqual(Object.keys(scenario.groupRole).length)
  })

  scenario('returns a single groupRole', async (scenario) => {
    const result = await groupRole({ cuid: scenario.groupRole.one.cuid })

    expect(result).toEqual(scenario.groupRole.one)
  })

  scenario('creates a groupRole', async (scenario) => {
    const result = await createGroupRole({
      input: {
        updatedAt: '2022-01-15T22:45:02Z',
        role: 'String',
        groupId: scenario.groupRole.two.groupId,
      },
    })

    expect(result.updatedAt).toEqual('2022-01-15T22:45:02Z')
    expect(result.role).toEqual('String')
    expect(result.groupId).toEqual(scenario.groupRole.two.groupId)
  })

  scenario('updates a groupRole', async (scenario) => {
    const original = await groupRole({ cuid: scenario.groupRole.one.cuid })
    const result = await updateGroupRole({
      cuid: original.cuid,
      input: { updatedAt: '2022-01-16T22:45:02Z' },
    })

    expect(result.updatedAt).toEqual('2022-01-16T22:45:02Z')
  })

  scenario('deletes a groupRole', async (scenario) => {
    const original = await deleteGroupRole({
      cuid: scenario.groupRole.one.cuid,
    })
    const result = await groupRole({ cuid: original.cuid })

    expect(result).toEqual(null)
  })
})
