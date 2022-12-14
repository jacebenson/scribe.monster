import ModelInstances from 'src/components/ModelInstance/ModelInstances'
import { Fragment } from 'react'
import { MetaTags } from '@redwoodjs/web'

const ModelInstancesPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'ModelInstance'}
        description={'ModelInstance'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <ModelInstances />
    </Fragment>
  )
}

export default ModelInstancesPage
