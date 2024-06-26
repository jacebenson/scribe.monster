// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <SecretField {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import SecretField from './SecretField'

export const generated = () => {
  return <SecretField />
}

export default {
  title: 'Components/SecretField',
  component: SecretField,
}
