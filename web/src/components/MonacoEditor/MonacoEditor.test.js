import { render } from '@redwoodjs/testing/web'

import MonacoEditor from './MonacoEditor'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MonacoEditor', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MonacoEditor />)
    }).not.toThrow()
  })
})
