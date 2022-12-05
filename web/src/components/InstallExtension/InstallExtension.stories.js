// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <InstallExtension {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import InstallExtension from './InstallExtension'

export const generated = () => {
  return <InstallExtension />
}

export default {
  title: 'Components/InstallExtension',
  component: InstallExtension,
}
