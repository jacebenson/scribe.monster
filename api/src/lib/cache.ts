import {
  createCache,
  InMemoryClient,
  RedisClient,
} from '@redwoodjs/api/cache'

import { logger } from './logger'

export let client: InMemoryClient | RedisClient
//export let client


  try {
    logger.info(`Connecting to cache at ${process.env.CACHE_HOST}`)
    client = new RedisClient({ url: process.env.CACHE_HOST, password:process.env.CACHE_PASSWORD , logger })
  } catch (e) {
    logger.error(`Could not connect to cache: ${e.message}`)
  }

export const { cache, cacheFindMany, cacheClient, deleteCacheKey } = createCache(client, {
  logger,
  timeout: 500,
})
