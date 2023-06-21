import { render } from '@redwoodjs/testing/web'

import JsonField from './JsonField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('JsonField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<JsonField />)
    }).not.toThrow()
  })
})
