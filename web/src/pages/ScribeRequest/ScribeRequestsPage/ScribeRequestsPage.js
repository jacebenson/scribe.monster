import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import ScribeRequests from 'src/components/ScribeRequest/ScribeRequests'

const ScribeRequestsPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'ScribeRequest'}
        description={'ScribeRequest'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <ScribeRequests />
    </Fragment>
  )
}

export default ScribeRequestsPage
