import { render } from '@redwoodjs/testing/web'

import ListPage from './ListPage2'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ListPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListPage />)
    }).not.toThrow()
  })
})
