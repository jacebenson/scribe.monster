import { Fragment, useState } from 'react'

import { Box, Button, Link } from '@chakra-ui/react'

import { navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { PlayIcon } from 'src/components/CallToActionWithVideo/'
import CallToActionWithVideo from 'src/components/CallToActionWithVideo/'
import Welcome from 'src/components/Welcome'

//import InstallExtension from '../InstallExtension/InstallExtension'
const AboutComponent = ({ auth0 /*, isAuthenticated, currentUser*/ }) => {
  const { isAuthenticated } = useAuth()

  let header = {
    lineOne: 'Scribe Monster',
    lineTwo: 'Unlock your scripting potential with Stew!',
  }
  let message = `This is backend for a Chrome Extension, sign up with your email.  Let Stew the scribe monster take the initiative and get started on your client scripts, business rules, script includes, code reviews, and design work.`
  let imageToVideo = './header.png'
  let imageAltText =
    'Find me in ./web/src/components/AboutComponent/AboutComponent.js'
  const { loading, logIn, logOut /*, currentUser*/, type } = useAuth()
  let [displayVideo, setDisplayVideo] = useState(false)

  if (loading) {
    // auth is rehydrating
    return null
  }
  let loginButtonString = 'Login'
  if (auth0?.domain) {
    loginButtonString = 'Login/Signup'
  }
  let unauthenticatedCTA = (
    <Box p={3} bg={'white'}>
      <CallToActionWithVideo
        header={header}
        message={message}
        imageAltText={imageAltText}
        image={imageToVideo}
        displayVideo={displayVideo}
        setDisplayVideo={setDisplayVideo}
      >
        <Button
          as={Link}
          rounded={'full'}
          size={'xl'}
          fontWeight={'normal'}
          px={6}
          backgroundColor={'green'}
          color={'white'}
          href={
            'https://chrome.google.com/webstore/detail/scribemonster/jdibjdmndifkeafbhbajogekgeolmmfh?hl=en&authuser=0'
          }
        >
          Get the Extension!
        </Button>

        <Fragment>
          {!auth0?.domain && (
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              backgroundColor={'green'}
              color={'white'}
              onClick={() => {
                navigate('/signup')
              }}
            >
              Sign up!
            </Button>
          )}
          <Button
            rounded={'full'}
            size={'lg'}
            fontWeight={'normal'}
            px={6}
            backgroundColor={'green'}
            color={'white'}
            onClick={async () => {
              if (type === 'auth0') {
                if (isAuthenticated) {
                  await logOut({ returnTo: auth0.redirect })
                } else {
                  const searchParams = new URLSearchParams(
                    window.location.search
                  )
                  await logIn({
                    appState: { targetUrl: searchParams.get('redirectTo') },
                  })
                }
              }
              if (type === 'dbAuth') {
                navigate('/login')
              }
            }}
          >
            {loginButtonString}
          </Button>
        </Fragment>
        <Button
          rounded={'full'}
          size={'lg'}
          fontWeight={'normal'}
          px={6}
          colorScheme={'blue'}
          onClick={() => {
            setDisplayVideo(true)
          }}
          leftIcon={<PlayIcon h={4} w={4} color={'gray.400'} />}
        >
          How It Works
        </Button>
        {/*<InstallExtension />*/}
      </CallToActionWithVideo>
    </Box>
  )

  return (
    (!isAuthenticated && unauthenticatedCTA) || (isAuthenticated && <Welcome />)
  )
}

export default AboutComponent
