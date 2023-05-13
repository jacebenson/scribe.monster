import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import Questions from 'src/components/Question/Questions'

const QuestionsPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'Question'}
        description={'Question'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Questions />
    </Fragment>
  )
}

export default QuestionsPage
