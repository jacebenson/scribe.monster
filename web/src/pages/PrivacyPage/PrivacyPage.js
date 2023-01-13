import { useEffect } from 'react'

import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Link as ChakraLink,
  Box,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  Center,
  List,
} from '@chakra-ui/react'

import { Link, routes, useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const PrivacyPage = () => {
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  let section = params.get('section')
  useEffect(() => {
    console.log({ section })
    if (section) {
      const element = document.getElementById(section)
      console.log({ element })
      if (element) {
        setTimeout(() => {
          console.log({ message: 'scrolling?' })
          element.scrollIntoView()
        }, 0)
      }
    }
    window.scrollTo(0, 0)
  }, [section])

  let privacySections = [
    {
      id: 'policy',
      title: 'Privacy Policy',
      content: (
        <>
          <Text>
            Jace Benson built the ScribeMonster extension and is intended for
            use as is.
          </Text>

          <Text>
            This page is used to inform visitors regarding my policies with the
            collection, use, and disclosure of Personal Information if anyone
            decided to use my Service.
          </Text>

          <Text>
            If you choose to use my Service, then you agree to the collection
            and use of information in relation to this policy. The Personal
            Information that I collect is used for providing and improving the
            Service. I will not use or share your information with anyone except
            as described in this Privacy Policy.
          </Text>

          <Text>
            The terms used in this Privacy Policy have the same meanings as in
            our Terms and Conditions, which are accessible at ScribeMonster
            unless otherwise defined in this Privacy Policy.
          </Text>
        </>
      ),
    },
    {
      id: 'data-collected',
      title: 'What data do we collect?',
      content: (
        <>
          <Text>We collect the following data:</Text>
          <List as={'ul'} size={'md'} m={3}>
            <ListItem>
              Personal data, such as your name, email address, and payment
              information.
            </ListItem>
            <ListItem>
              Usage data, such as information about how you use our Service.
            </ListItem>
          </List>
        </>
      ),
    },
    {
      id: 'data-collection',
      title: 'How do we collect your data?',
      content: (
        <>
          You directly provide us with most of the data we collect. We collect
          data and process data when you:
          <List as={'ul'} size={'md'} m={3}>
            <ListItem>Register your account with us</ListItem>
            <ListItem>Use or view our Service via your browser</ListItem>
            <ListItem>
              Use or view our Service via the Google Chrome Extension
            </ListItem>
          </List>
        </>
      ),
    },
    {
      id: 'data-use',
      title: 'How do we use your data?',
      content: (
        <>
          <Text>
            We collect your data so that we can:
            <List as={'ul'} size={'md'} m={3}>
              <ListItem>Process your requests with OpenAI</ListItem>
              <ListItem>
                Send you email via mailgun to manage your account and provide
                you with information about our Service
              </ListItem>
              <ListItem>
                To monitor and analyze usage and trends with Umami Analytics
              </ListItem>
            </List>
          </Text>
          <Text>If you agree, we will share the following data with:</Text>
          <List as={'ul'} size={'md'} m={3}>
            <ListItem>
              Prompts: OpenAI{' '}
              <ChakraLink
                target={'_blank'}
                isExternal={''}
                href={'https://openai.com/privacy'}
              >
                OpenAI{"'"}s Privacy Policy
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>
            <ListItem>
              Email: Mailgun
              <ChakraLink
                target={'_blank'}
                isExternal={''}
                href={'https://www.mailgun.com/privacy-policy'}
              >
                {' '}
                Mailgun{"'"}s Privacy Policy
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>
            <ListItem>
              Page Analytics: Umami Analytics{' '}
              <ChakraLink
                target={'_blank'}
                isExternal={''}
                href={'https://umami.is/privacy'}
              >
                Umami Analytics{"'"}s Privacy Policy
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>
          </List>
        </>
      ),
    },
    {
      id: 'data-storage',
      title: 'How do we store your data?',
      content: (
        <>
          <Text>
            We securely store your data at a third-party service provider. We
            use Render.com to host our website and database. The region where
            your data is stored is the Oregon, United States. Render.com{"'"}s
            privacy policy can be found here:{' '}
            <ChakraLink
              target={'_blank'}
              isExternal={''}
              href={'https://render.com/privacy'}
            >
              Render.com{"'"}s Privacy Policy
              <ExternalLinkIcon mx="2px" />
            </ChakraLink>
          </Text>
        </>
      ),
    },
    {
      id: 'marketing',
      title: 'Marketing',
      content: (
        <>
          <Text>
            We may use your data to send you marketing communications about our
            Service. As we don{"'"}t currently have any marketing, we won{"'"}t
            be sending you any marketing communications. When we do, you will be
            able to opt out of receiving them.
          </Text>
        </>
      ),
    },
    {
      id: 'data-rights',
      title: 'What are your data protection rights?',
      content: (
        <>
          <Text>
            We would like to make sure you are fully aware of all your data
            protection rights. Every user is entitled to the following:
          </Text>
          <List as={'ul'} size={'md'} m={3}>
            <ListItem>
              <Box as={'u'}>The right to access</Box>
              <Text>
                You have the right to request us for copies of your personal
                data. We may charge you a small fee for this service.
              </Text>
            </ListItem>
            <ListItem>
              <Box as={'u'}>The right to rectification</Box>
              <Text>
                You have the right to request that we correct any information
                you believe is inaccurate. You also have the right to request
                that we complete the information you believe is incomplete.
              </Text>
            </ListItem>
            <ListItem>
              <Box as={'u'}>The right to erasure</Box>
              <Text>
                You have the right to request that we erase your personal data,
                under certain conditions.
              </Text>
            </ListItem>
            <ListItem>
              <Box as={'u'}>The right to restrict processing</Box>
              <Text>
                You have the right to request that we restrict the processing of
                your personal data, under certain conditions.
              </Text>
            </ListItem>
            <ListItem>
              <Box as={'u'}>The right to object to processing</Box>
              <Text>
                You have the right to object to our processing of your personal
                data, under certain conditions.
              </Text>
            </ListItem>
            <ListItem>
              <Box as={'u'}>The right to data portability</Box>
              <Text>
                You have the right to request that we transfer the data that we
                have collected to another organization, or directly to you,
                under certain conditions.
              </Text>
            </ListItem>
          </List>
          <Text>
            If you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please{' '}
            <ChakraLink
              target={'_blank'}
              isExternal={''}
              href={'mailto:jace@benson.run'}
            >
              contact us via email
              <ExternalLinkIcon mx="2px" />
            </ChakraLink>
          </Text>
        </>
      ),
    },

    {
      id: 'cookies',
      title: 'Cookies',
      content: (
        <>
          <Text>
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device{"'"}s
            internal memory.
          </Text>
          <Text>
            This Site uses funcionality based “cookies” for authentication and
            to track if you allow the use of cookies on this site.
          </Text>
        </>
      ),
    },
    {
      id: 'links',
      title: 'Links to Other Sites',
      content: (
        <>
          <Text>
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by me. Therefore, I strongly advise
            you to review the Privacy Policy of these websites. I have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </Text>
        </>
      ),
    },
    {
      id: 'changes-to-privacy-policy',
      title: 'Changes to This Privacy Policy',
      content: (
        <>
          <Text>
            I may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. I will
            notify you of any changes by posting the new Privacy Policy on this
            page.
          </Text>

          <Text>This policy is effective as of 2023-01-12</Text>
        </>
      ),
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      content: (
        <>
          <Text>
            If you have any questions or suggestions about my Privacy Policy, do
            not hesitate to{' '}
            <ChakraLink
              isExternal={''}
              onClick={() => {
                window.open(
                  'mailto:jace' + '@' + 'benson.com&subject=About ScribeMonster'
                )
              }}
            >
              email me
            </ChakraLink>
            .
          </Text>

          <Text>
            This privacy policy page was created at{' '}
            <ChakraLink
              isExternal={''}
              href={'https://privacypolicytemplate.net'}
            >
              privacypolicytemplate.net
              <ExternalLinkIcon mx="2px" />
            </ChakraLink>{' '}
            and modified/generated by{' '}
            <ChakraLink
              isExternal={''}
              href={'https://app-privacy-policy-generator.nisrulz.com/'}
            >
              App Privacy Policy Generator
              <ExternalLinkIcon mx="2px" />
            </ChakraLink>
          </Text>
        </>
      ),
    },
  ]
  return (
    <Center>
      <Box p={3} bg={'white'} maxW={'800px'}>
        <MetaTags title="Privacy" description="Privacy page" />
        <Heading id={'h1'}>ScribeMonster Privacy Policy</Heading>
        <Box pl={100} border={'1px'} borderColor={'gray.200'}>
          <UnorderedList spacing={3}>
            {privacySections.map((section) => {
              return (
                <ListItem key={section.id}>
                  <Link to={routes.privacy({ section: section.id })}>
                    {section.title}
                  </Link>
                </ListItem>
              )
            })}
          </UnorderedList>
        </Box>
        {privacySections.map((section) => {
          return (
            <Box key={section.id}>
              <Heading py={1} id={section.id} size={'xl'}>
                {section.title}
              </Heading>
              <Box pl={5}>{section.content}</Box>
            </Box>
          )
        })}
      </Box>
    </Center>
  )
}

export default PrivacyPage
