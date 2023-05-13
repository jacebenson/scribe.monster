import { Box, IconButton } from '@chakra-ui/react'
import { MdEditNote } from 'react-icons/md'

import { navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
const EditButton = ({ row, column, roles }) => {
  const { hasRole } = useAuth()
  return (
    <Box>
      {column.canEdit && hasRole([roles?.editRecord].concat(['admin'])) && (
        <IconButton
          aria-label="Edit"
          value={JSON.stringify(row)}
          onClick={() => {
            navigate(column.editLink(row.cuid))
          }}
          icon={<MdEditNote />}
          colorScheme="green"
          type="button"
        />
      )}
    </Box>
  )
}

export default EditButton
