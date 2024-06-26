// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <AskStew {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import AskStew from './AskStew'

export const generated = () => {
  return <AskStew />
}

export default {
  title: 'Components/AskStew',
  component: AskStew,
}
