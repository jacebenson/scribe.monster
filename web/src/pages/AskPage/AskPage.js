import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import AskStew from 'src/components/AskStew/AskStew'

const AskPage = () => {
  return (
    <>
      <MetaTags title="Ask" description="Ask page" />
      <AskStew />
    </>
  )
}

export default AskPage
