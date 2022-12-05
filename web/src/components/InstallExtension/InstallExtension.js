import { Button, Link } from '@chakra-ui/react'
const InstallExtension = () => {
  const chromeStoreLink = 'https://ddg.gg/#TODOREPLACEME'
  return (
    <Button
      as={Link}
      href={chromeStoreLink}
      backgroundColor={'green'}
      rounded={'full'}
      size={'lg'}
      fontWeight={'normal'}
      px={6}
    >
      Install Extension
    </Button>
  )
}

export default InstallExtension
