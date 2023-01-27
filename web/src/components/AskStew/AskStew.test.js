import { render } from '@redwoodjs/testing/web'

import AskStew from './AskStew'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AskStew', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AskStew />)
    }).not.toThrow()
  })
})
