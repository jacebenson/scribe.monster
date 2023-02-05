import { db } from 'src/lib/db'

module.exports = {
  active: true,
  order: 100,
  when: ['before'],
  operation: ['create', 'update'],
  table: 'user',
  file: __filename,
  command: async function ({ data, status }) {
    console.log({
      function: 'onCreateAndUpdateRequireUniqueEmailName',
      data,
      status,
    })
    let userFound = await db.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] },
    })
    console.log({ userFound })
    if (userFound) {
      return {
        data,
        status: { code: 'failure', message: 'Email and Name must be unique' },
      }
    }
    return await { data, status }
  },
}
