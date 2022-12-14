import PromptTrainingDatas from 'src/components/PromptTrainingData/PromptTrainingDatas'
import { Fragment } from 'react'
import { MetaTags } from '@redwoodjs/web'

const PromptTrainingDatasPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'PromptTrainingData'}
        description={'PromptTrainingData'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <PromptTrainingDatas />
    </Fragment>
  )
}

export default PromptTrainingDatasPage
