import { navigate, routes, useLocation } from '@redwoodjs/router'
import { useState, useEffect } from 'react'
import {
  Flex,
  Table,
  TableCaption,
  Heading,
  Box,
  Spacer,
  Button,
  useMediaQuery,
  Center,
} from '@chakra-ui/react'
import TableColumns from 'src/components/TableColumns'
import TableQuery from 'src/components/TableQuery'
import TablePagination from 'src/components/TablePagination'
import TableRows from 'src/components/TableRows/TableRows'
import { DELETE_MEMORY_CHUNK_MUTATION } from 'src/components/MemoryChunk/EditMemoryChunkCell'
import { MdAdd, MdKeyboardBackspace } from 'react-icons/md'
import TableSkeleton from 'src/components/TableSkeleton/TableSkeleton'

export const beforeQuery = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  return {
    variables: {
      q: params.get('q'),
      filter: params.get('filter') || props.fuzzyQuery,
      skip: params.get('skip') || props.skip || 0,
      take: params.get('take') || props.take || 10,
      orderBy: params.get('orderBy') || props.orderBy,
    },
    fetchPolicy: 'no-cache',
  }
}
// Looks like you have some foreign keys
// [] you may want to update the query
// below to include the related values
export const QUERY = gql`
  query FindMemoryChunks(
    $filter: String
    $skip: Int
    $take: Int
    $q: String
    $orderBy: OrderByInput
  ) {
    memoryChunks(
      filter: $filter
      skip: $skip
      take: $take
      q: $q
      orderBy: $orderBy
    ) {
      count
      take
      skip
      q
      results {
        cuid
        createdAt
        updatedAt
        content
        vector
        active
        title
        memoryCuid
      }
    }
  }
`

export const Loading = () => <TableSkeleton />

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.memoryChunk}</div>
)

export const Success = ({
  memoryChunks,
  fuzzyQuery,
  setFuzzyQuery,
  query,
  setQuery,
  columns,
  initialColumns,
  setColumns,
  orderBy,
  setOrderBy,
  skip,
  setSkip,
  take,
  setTake,
  displayColumn,
  roles,
}) => {
  let [data, setData] = useState(memoryChunks)
  const [isSmallScreen] = useMediaQuery(`(max-width: 950px)`)
  // if small screen remove inner array from columns and data.
  let returnFirstAndLast = (arrayOfThings) => {
    let { 0: a, [arrayOfThings.length - 1]: b } = arrayOfThings
    return [a, b]
  }
  useEffect(() => {
    if (isSmallScreen) setColumns(returnFirstAndLast(columns))
    if (!isSmallScreen) setColumns(initialColumns)
  }, [isSmallScreen, setColumns, initialColumns])
  return (
    <Box p={3} backgroundColor={'white'}>
      <Heading>MemoryChunks ({data.count})</Heading>
      <Flex>
        <Box>
          {memoryChunks.q !== null && (
            <Button
              leftIcon={<MdKeyboardBackspace />}
              colorScheme="green"
              variant="solid"
              onClick={() => {
                setQuery('')
                setFuzzyQuery('')
                navigate(routes.memoryChunks({}))
              }}
            >
              All memoryChunks
            </Button>
          )}
        </Box>
        <Spacer />
        <Button
          leftIcon={<MdAdd />}
          colorScheme="green"
          variant="solid"
          onClick={() => {
            navigate(routes.newMemoryChunk())
          }}
        >
          New memoryChunk
        </Button>
      </Flex>
      <TableQuery
        query={query}
        setQuery={setQuery}
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        rawQuery={memoryChunks.q}
        inputPlaceholder="Search"
        link={(query) => {
          return routes.memoryChunks({ q: query })
        }}
        setSkip={setSkip}
      />

      <Table variant="striped" colorScheme={'green'} size="xs">
        <TableCaption>List of MemoryChunks</TableCaption>

        <TableColumns
          columns={columns}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setColumns={setColumns}
          initialColumns={initialColumns}
          setTake={setTake}
        />

        <TableRows
          columns={columns}
          roles={roles}
          setData={setData}
          data={data}
          model="memoryChunks"
          deleteMutation={DELETE_MEMORY_CHUNK_MUTATION}
          displayColumn={displayColumn}
        />
      </Table>
      <Center>
        <TablePagination
          count={data.count}
          skip={skip}
          setSkip={setSkip}
          take={take}
        />
      </Center>
    </Box>
  )
}
