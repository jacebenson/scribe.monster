import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import Memories from 'src/components/Memory/Memories'

const MemoriesPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'Memory'}
        description={'Memory'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Memories />
    </Fragment>
  )
}

export default MemoriesPage
