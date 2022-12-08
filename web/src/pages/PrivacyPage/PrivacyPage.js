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
            Jace Benson built the ScribeMonster extension as a Free extension.
            This SERVICE is provided by Jace Benson at no cost and is intended
            for use as is.
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
      id: 'information',
      title: 'Information Collection and Use',
      content: (
        <>
          <Text>
            For a better experience, while using our Service, I may require you
            to provide us with certain personally identifiable information,
            including but not limited to Email. The information that I request
            will be retained on your device and is not collected by me in any
            way.
          </Text>
          <Text>
            The app does use third-party services that may collect information
            used to identify you.
          </Text>
          <Text>
            OpenAI does use a small amount their requests to retain their
            models, however that can be opted out of and I{"'"}ve opted out of
            that.
          </Text>
          <Text>
            Link to the privacy policy of third-party service providers used by
            the app
          </Text>
          <ChakraLink isExternal={''} href={'https://openai.com/privacy/'}>
            OpenAI
            <ExternalLinkIcon mx="2px" />
          </ChakraLink>
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
            This Site uses “cookies” for authentication and to track if you
            allow the use of cookies on this site.
          </Text>
        </>
      ),
    },
    {
      id: 'service-providers',
      title: 'Service Providers',
      content: (
        <>
          <Text>
            I may employ third-party companies and individuals due to the
            following reasons:
          </Text>

          <UnorderedList>
            <ListItem>
              To facilitate our Service;{' '}
              <ChakraLink isExternal={''} href={'https://openai.com/privacy/'}>
                OpenAI
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>
            <ListItem>To provide the Service on our behalf;</ListItem>
            <ListItem>To perform Service-related services; or</ListItem>
            <ListItem>
              To assist us in analyzing how our Service is used.{' '}
              <ChakraLink isExternal={''} href={'https://monitoring.jace.pro/'}>
                Self hosted Umami
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
              <ChakraLink isExternal={''} href={'https://umami.is/privacy'}>
                Umami Privacy Policy
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>
          </UnorderedList>
          <Text>
            I want to inform users of this Service that these third parties have
            access to their Personal Information. The reason is to perform the
            tasks assigned to them on our behalf. However, they are obligated
            not to disclose or use the information for any other purpose.
          </Text>
        </>
      ),
    },
    {
      id: 'security',
      title: 'Security',
      content: (
        <>
          <Text>
            I value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and I
            cannot guarantee its absolute security.
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
      id: 'chilrens-privacy',
      title: "Children's privacy",
      content: (
        <>
          <Text>
            These Services do not address anyone under the age of 13. I do not
            knowingly collect personally identifiable information from children
            under 13 years of age. In the case I discover that a child under 13
            has provided me with personal information, I immediately delete this
            from our servers. If you are a parent or guardian and you are aware
            that your child has provided us with personal information, please
            contact me so that I will be able to do the necessary actions.
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

          <Text>This policy is effective as of 2022-12-07</Text>
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
