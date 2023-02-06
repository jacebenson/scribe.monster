import React from 'react'

import {
  ChakraProvider,
  ColorModeScript /*, extendTheme*/,
} from '@chakra-ui/react'

import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import { AuthProvider } from 'src/auth'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { theme } from './chakraUiTheme'

//import 'src/scaffold.css'
//import 'src/reset.css'
//import 'src/index.css'

const App = () => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <RedwoodProvider titleTemplate="%AppTitle · %PageTitle">
          <AuthProvider type="dbAuth">
            <RedwoodApolloProvider>
              <Routes />
            </RedwoodApolloProvider>
          </AuthProvider>
        </RedwoodProvider>
      </ChakraProvider>
    </FatalErrorBoundary>
  )
}

export default App
