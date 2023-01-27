import { render } from '@redwoodjs/testing/web'

import AskPage from './AskPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AskPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AskPage />)
    }).not.toThrow()
  })
})
