import { MetaTags } from '@redwoodjs/web'

import AboutComponent from 'src/components/AboutComponent'
let jsonLD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ScribeMonster',
  operatingSystem: 'Google Chrome',
  applicationCategory: 'Browser Extension',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '1',
  },
  offers: {
    '@type': 'Offer',
    price: '0.00',
    priceCurrency: 'USD',
  },
}
const HomePage = () => {
  return (
    <>
      <MetaTags
        title="ScribeMonster"
        description="Scribemonster is a Chrome extension that helps with your code and access AI tools.  This is backend for a Chrome Extension, sign up with your email.  Let Stew the scribe monster take the initiative and get started on your client scripts, business rules, script includes, code reviews, and design work."
        ogUrl="https://scribe.monster"
        ogContentUrl="https://scribe.monster/header.png"
        author="Jace Benson"
        ogTitle="ScribeMonster"
        ogDescription="Scribemonster is a Chrome extension that helps with your code and access AI tools.  This is backend for a Chrome Extension, sign up with your email.  Let Stew the scribe monster take the initiative and get started on your client scripts, business rules, script includes, code reviews, and design work."
        ogImage="https://scribe.monster/header.png"
        ogImageAlt="ScribeMonster"
      />{' '}
      <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>
      <AboutComponent />
    </>
  )
}
export default HomePage
