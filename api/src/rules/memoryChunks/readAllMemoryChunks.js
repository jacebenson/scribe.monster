module.exports = {
  active: true, //           controls if this runs
  order: 10, //              controls the order this runs
  when: ['before'], //       used to filter rules to run
  operation: ['readAll'], // used to filter rules to run
  table: 'memoryChunk', //         used to filter rules to run
  file: __filename, //       used for logging
  /**
   *
   * @param {Array} where // array of where clauses, if the query Object is just pushed without a preceing "OR" it will be required see
   * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#where
   * @param {object} filter // object to look up records
   * @param {object} q // string from URL maybe malformed Object
   * @returns
   */
  command: async function ({ where, filter, q }) {
    if (context.currentUser.roles.includes('memoryChunkRead')) {
      where.push({ cuid: context.currentUser.cuid }) // required for all queries
    }
    if (filter) {
      where.push({
        OR: [
          // not required
          { title: { contains: filter, mode: 'insensitive' } },
          //{ username: { contains: filter, mode: 'insensitive' } },
          { content: { contains: filter, mode: 'insensitive' } },
        ],
      })
    }
    if (q && q.length > 0) {
      try {
        let urlQuery = JSON.parse(q)
        where.push(
          urlQuery
          //OR: [JSON.parse(q)],
        )
      } catch (error) {
        console.error('cannot parse from rule', error)
      }
    }
    return { where }
  },
}
