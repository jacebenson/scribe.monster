import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import Threads from 'src/components/Thread/Threads'

const ThreadsPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'Thread'}
        description={'Thread'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Threads />
    </Fragment>
  )
}

export default ThreadsPage
