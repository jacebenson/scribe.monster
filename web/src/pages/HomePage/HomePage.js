import { MetaTags } from '@redwoodjs/web'

import AboutComponent from 'src/components/AboutComponent'
const HomePage = () => {
  return (
    <>
      <MetaTags
        title="Scribemonster"
        description="Scribemonster is a Chrome extension that helps with your code and access AI tools."
        ogUrl="https://scribe.monster"
        ogContentUrl="https://scribe.monster/icon-512.png"
      />
      <AboutComponent />
    </>
  )
}
export default HomePage
