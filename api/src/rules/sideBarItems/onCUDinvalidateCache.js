import { logger } from 'src/lib/logger'
import { cache, deleteCacheKey } from 'src/lib/cache'
module.exports = {
  active: true,
  order: 1,
  when: ['before'],
  operation: ['update', 'create', 'delete'],
  table: 'sideBarItem',
  file: __filename,
  command: async function ({ data, status }) {
    try {
      // delete the cache for SideBarItem-count and SideBarItem
      await deleteCacheKey('SideBarItem-count')
      await deleteCacheKey('SideBarItem')

    } catch (e) {
      logger.error(e)
    }
    return { data, status }
  },
}
