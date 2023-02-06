import { CloseIcon } from '@chakra-ui/icons'
import { useToast, IconButton, Box } from '@chakra-ui/react'

import { useAuth } from 'src/auth'
import { useMutation } from '@redwoodjs/web'
const DeleteButton = ({
  column,
  row,
  roles,
  data,
  setData,
  deleteMutation,
  displayColumn,
}) => {
  const toast = useToast()
  const { hasRole } = useAuth()

  let handleDeleteItem = (cuid) => {
    let foundRow = data.results?.filter((record) => {
      return record.cuid === cuid
    })
    let question = `Are you sure you want to delete ${foundRow[0][displayColumn]}?`
    if (confirm(question)) {
      deleteRecord({ variables: { cuid } })
    }
  }
  const [deleteRecord] = useMutation(deleteMutation, {
    onError: (error) => {
      toast({
        status: 'error',
        title: `Error - not deleted`,
        description: error.message,
      })
    },
    onCompleted: (del) => {
      toast({
        status: 'success',
        title: `Deleted ${del.deletedRow[displayColumn]}`,
      })
      setData({
        ...data,
        results: data.results?.filter((row) => {
          return !(row.id === del.deletedRow.id)
        }),
        count: data.count - 1,
      })
    },
  })
  return (
    <Box>
      {column.canDelete && hasRole([roles.deleteRecord].concat(['admin'])) && (
        <IconButton
          aria-label="Remove"
          value={row.id}
          onClick={() => {
            handleDeleteItem(row.cuid)
          }}
          icon={<CloseIcon />}
          colorScheme="red"
          variant="solid"
          type="button"
        />
      )}
    </Box>
  )
}

export default DeleteButton
