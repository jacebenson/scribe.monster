import MemoryChunks from 'src/components/MemoryChunk/MemoryChunks'
import { Fragment } from 'react'
import { MetaTags } from '@redwoodjs/web'

const MemoryChunksPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'MemoryChunk'}
        description={'MemoryChunk'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <MemoryChunks />
    </Fragment>
  )
}

export default MemoryChunksPage
