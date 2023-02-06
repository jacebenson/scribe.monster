import {
  memoryChunks,
  memoryChunk,
  createMemoryChunk,
  updateMemoryChunk,
  deleteMemoryChunk,
} from './memoryChunks'

describe('memoryChunks', () => {
  scenario('returns all memoryChunks', async (scenario) => {
    const result = await memoryChunks()

    expect(result.length).toEqual(Object.keys(scenario.memoryChunk).length)
  })

  scenario('returns a single memoryChunk', async (scenario) => {
    const result = await memoryChunk({ cuid: scenario.memoryChunk.one.id })

    expect(result).toEqual(scenario.memoryChunk.one)
  })

  scenario('creates a memoryChunk', async (scenario) => {
    const result = await createMemoryChunk({
      input: {
        updatedAt: '2023-02-05T04:51:06.866Z',
        content: 'String',
        title: 'String',
        memoryCuid: scenario.memoryChunk.two.memoryCuid,
      },
    })

    expect(result.updatedAt).toEqual('2023-02-05T04:51:06.866Z')
    expect(result.content).toEqual('String')
    expect(result.title).toEqual('String')
    expect(result.memoryCuid).toEqual(scenario.memoryChunk.two.memoryCuid)
  })

  scenario('updates a memoryChunk', async (scenario) => {
    const original = await memoryChunk({ cuid: scenario.memoryChunk.one.cuid })
    const result = await updateMemoryChunk({
      cuid: original.cuid,
      input: { updatedAt: '2023-02-06T04:51:06.866Z' },
    })

    expect(result.updatedAt).toEqual('2023-02-06T04:51:06.866Z')
  })

  scenario('deletes a memoryChunk', async (scenario) => {
    const original = await deleteMemoryChunk({
      cuid: scenario.memoryChunk.one.cuid,
    })
    const result = await memoryChunk({ cuid: original.cuid })

    expect(result).toEqual(null)
  })
})
