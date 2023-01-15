// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <MonacoEditor {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import MonacoEditor from './MonacoEditor'

export const generated = () => {
  return <MonacoEditor />
}

export default {
  title: 'Components/MonacoEditor',
  component: MonacoEditor,
}
