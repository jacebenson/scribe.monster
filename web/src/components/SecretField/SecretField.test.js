import { render } from '@redwoodjs/testing/web'

import SecretField from './SecretField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SecretField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SecretField />)
    }).not.toThrow()
  })
})
