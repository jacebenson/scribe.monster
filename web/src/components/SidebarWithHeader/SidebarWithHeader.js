import React from 'react'

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Button,
  Spacer,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {
  MdList,
  MdHome,
  MdMenu,
  MdDoorbell,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md'

import { routes, navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { ListContext } from 'src/App.js'
import NavItem from '../NavItem/NavItem'
const SidebarWithHeader = ({ brand, children }) => {
  const { table, setTable, page, setPage, take, setTake, where, setWhere, orderBy, setOrderBy } = React.useContext(ListContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  let navigateAndClose = ({navigateTo, table, page, take, where, orderBy}) => {
    if(navigateTo === 'list') {
    setTable(table)
    setPage(page || 1)
    setTake(take || 10)
    setWhere(where || '')
    setOrderBy(orderBy || 'cuid/desc')
    onClose()
    }
  }
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        brand={brand}
        navigateAndClose={navigateAndClose}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav brand={brand} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

// interface SidebarProps extends BoxProps {
//   onClose: () => void;
// }

//const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
const SidebarContent = ({ brand, onClose, navigateAndClose, ...rest }) => {
  const { hasRole, isAuthenticated } = useAuth()

  const LinkItems = [
    { name: 'Home',            icon: MdHome, navigateTo: 'home' },
    { name: 'Users',           icon: MdList, role: 'userRead',          table: 'users', orderBy: 'createdAt/desc' },
    { name: 'Groups',          icon: MdList, role: 'groupRead',         table: 'groups' },
    { name: 'Group Members',   icon: MdList, role: 'groupMemberRead',   table: 'groupMembers' },
    { name: 'Group Roles',     icon: MdList, role: 'groupRoleRead',     table: 'groupRoles' },
    { name: 'Preferences',     icon: MdList, role: 'preferenceRead',    table: 'preferences' },
    { name: 'Properties',      icon: MdList, role: 'propertyRead',      table: 'properties' },
    { name: 'Messages',        icon: MdList, role: 'messageRead',       table: 'messages' },
    { name: 'Logs',            icon: MdList, role: 'logRead',           table: 'logs' },
    { name: 'Activities',      icon: MdList, role: 'activityRead',      table: 'activities', orderBy: 'createdAt/desc' },
    { name: 'Model Instances', icon: MdList, role: 'modelInstanceRead', table: 'modelInstances' },
    { name: 'Memories',        icon: MdList, role: 'memoryRead',        table: 'memories'},
    { name: 'Memory Chunks',   icon: MdList, role: 'memoryChunkRead',   table: 'memoryChunks' },
    { name: 'Threads',         icon: MdList, role: 'threadRead',        table: 'threads' },
    { name: 'Questions',       icon: MdList, role: 'questionRead',      table: 'questions' },

  ].filter((item) => {
    if (item?.requireAuth === true && isAuthenticated) {
      return (
        item?.requireAuth === true || hasRole(item.role) || hasRole('admin')
      )
    }
    return hasRole(item.role) || hasRole('admin')
  })
  return (
    <Box
      overflowY={'scroll'}
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {brand}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => {
        if(!link?.navigateTo) link.navigateTo = 'list'
        //
          //navigateTo={link.navigateTo}
        return (
        <NavItem
          pt={0}
          pb={0}
          size={'sm'}
          key={link.name}
          icon={link.icon}
          onClick={()=>{navigateAndClose({
            ...link
          })}}
          navigateTo={link.navigateTo}
          table={link?.table}
        >
          {link.name}
        </NavItem>)
      })}
    </Box>
  )
}
const MobileNav = ({ brand, onOpen, ...rest }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<MdMenu />}
      />
      <Spacer />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {brand}
      </Text>
      <Spacer />

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<MdDoorbell />}
        />
        <Flex alignItems={'center'}>
          {!isAuthenticated && (
            <Button
              backgroundColor={'green'}
              onClick={() => {
                navigate(routes.login())
              }}
            >
              Log in
            </Button>
          )}
          {isAuthenticated && (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{currentUser?.name || 'You'}</Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <MdOutlineKeyboardArrowDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <Box>
                  <MenuItem
                    onClick={() => {
                      navigate(routes.myProfile())
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuDivider />
                </Box>
                <MenuItem
                  onClick={() => {
                    logOut()
                  }}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </HStack>
    </Flex>
  )
}

export default SidebarWithHeader
