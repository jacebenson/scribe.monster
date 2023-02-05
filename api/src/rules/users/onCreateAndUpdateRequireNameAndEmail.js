module.exports = {
  active: true,
  order: 90,
  when: ['before'],
  operation: ['create', 'update'],
  table: 'user',
  file: __filename,
  command: async function ({ data, status }) {
    data.name = data?.name?.trim()
    data.email = data?.username?.trim()
    if (!data?.name || !data?.email) {
      return {
        data,
        status: { code: 'failure', message: 'Name and Email are required' },
      }
    }
    return await { data, status }
  },
}
