import {
  Box,
  Container,
  Stack,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Stack direction={'row'} spacing={6}>
          <Link to={routes.home()}>Home</Link>
          <Link to={routes.privacy()}>Privacy Policy</Link>
        </Stack>
        <Text>
          Powered by{' '}
          <ChakraLink isExternal href="https://tskr.io">
            Tskr
          </ChakraLink>{' '}
          and{' '}
          <ChakraLink isExternal href="https://openai.com">
            OpenAI
          </ChakraLink>
        </Text>
        <Text>© 2022 Scribe Monster. All rights reserved</Text>
      </Container>
    </Box>
  )
}
