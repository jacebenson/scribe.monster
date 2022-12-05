import { render } from '@redwoodjs/testing/web'

import InstallExtension from './InstallExtension'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InstallExtension', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InstallExtension />)
    }).not.toThrow()
  })
})
