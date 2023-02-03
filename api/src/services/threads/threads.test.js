import {
  threads,
  thread,
  createThread,
  updateThread,
  deleteThread,
} from './threads'

describe('threads', () => {
  scenario('returns all threads', async (scenario) => {
    const result = await threads()

    expect(result.length).toEqual(Object.keys(scenario.thread).length)
  })

  scenario('returns a single thread', async (scenario) => {
    const result = await thread({ cuid: scenario.thread.one.id })

    expect(result).toEqual(scenario.thread.one)
  })

  scenario('creates a thread', async () => {
    const result = await createThread({
      input: { updatedAt: '2023-02-01T02:35:08.735Z' },
    })

    expect(result.updatedAt).toEqual('2023-02-01T02:35:08.735Z')
  })

  scenario('updates a thread', async (scenario) => {
    const original = await thread({ cuid: scenario.thread.one.cuid })
    const result = await updateThread({
      cuid: original.cuid,
      input: { updatedAt: '2023-02-02T02:35:08.735Z' },
    })

    expect(result.updatedAt).toEqual('2023-02-02T02:35:08.735Z')
  })

  scenario('deletes a thread', async (scenario) => {
    const original = await deleteThread({ cuid: scenario.thread.one.cuid })
    const result = await thread({ cuid: original.cuid })

    expect(result).toEqual(null)
  })
})
