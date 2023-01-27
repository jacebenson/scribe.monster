import {
  memories,
  memory,
  createMemory,
  updateMemory,
  deleteMemory,
} from './memories'

describe('memories', () => {
  scenario('returns all memories', async (scenario) => {
    const result = await memories()

    expect(result.length).toEqual(Object.keys(scenario.memory).length)
  })

  scenario('returns a single memory', async (scenario) => {
    const result = await memory({ cuid: scenario.memory.one.id })

    expect(result).toEqual(scenario.memory.one)
  })

  scenario('creates a memory', async () => {
    const result = await createMemory({
      input: { updatedAt: '2023-01-24T21:55:22.698Z', content: 'String' },
    })

    expect(result.updatedAt).toEqual('2023-01-24T21:55:22.698Z')
    expect(result.content).toEqual('String')
  })

  scenario('updates a memory', async (scenario) => {
    const original = await memory({ cuid: scenario.memory.one.cuid })
    const result = await updateMemory({
      cuid: original.cuid,
      input: { updatedAt: '2023-01-25T21:55:22.698Z' },
    })

    expect(result.updatedAt).toEqual('2023-01-25T21:55:22.698Z')
  })

  scenario('deletes a memory', async (scenario) => {
    const original = await deleteMemory({ cuid: scenario.memory.one.cuid })
    const result = await memory({ cuid: original.cuid })

    expect(result).toEqual(null)
  })
})
