import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import AskStew from 'src/components/AskStew/AskStew'

const AskPage = ({cuid}) => {
  return (
    <>
      <MetaTags title="Ask" description="Ask page" />
      <AskStew cuid={cuid} />
    </>
  )
}

export default AskPage
