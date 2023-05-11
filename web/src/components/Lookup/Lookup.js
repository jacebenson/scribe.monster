import { Box, Input, Text } from "@chakra-ui/react"
import LookupCell from "src/components/LookupCell"
import { useFormContext } from "react-hook-form"
const Lookup = ({ table, field,  }) => {
  const { register } = useFormContext()
  let [where, setWhere] = React.useState(null)
  let [query, setQuery] = React.useState('')
  let [lookUpValue, setLookUpValue] = React.useState('')
  let filterTimeout = null
  let handleInput = (e) => {
    let { value } = e.target
    setQuery(value)
    // we need to debounce this
    clearTimeout(filterTimeout)
    if (e.target.value === "") { setQuery(''); setWhere(null); return }
    filterTimeout = setTimeout(() => {
      // we need a where object like so
      // where: { name: { contains: value, mode: 'insensitive' } }
      setWhere( `${field}/contains/${value}`)
    }, 500)
  }
  return (
    <Box>
      <Input
        id={field.name}
        defaultValue={lookUpValue}
        readOnly={true}
        display={'none'}
        {...register(field.name, {
          required: field?.definition?.required || false,
          maxLength: field?.definition?.maxLength || 255,
          minLength: field?.definition?.minLength || 0,
          onChange: field?.definition?.onChange || null,
        })}

      />
      <Input
        value={query}
        onChange={(e) => handleInput(e)}
        placeholder="Search..."
      />
      <LookupCell
        table={table}
        where={where}
        setLookUpValue={setLookUpValue}
        setQuery={setQuery}
      />
    </Box>

  )
}

export default Lookup
