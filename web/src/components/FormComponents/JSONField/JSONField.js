import React from 'react'

import { Box, Textarea,Button } from '@chakra-ui/react'
import ResizeTextarea from 'react-textarea-autosize'
import { set } from '@redwoodjs/forms'

export const JSONField = React.forwardRef((props, ref) => {
  // we need to check if the value is a valid JSON string
  // if it isn't show an error message
  let [error, setError] = React.useState(false)
  let [errorMessage, setErrorMessage] = React.useState('')
  let [value, setValue] = React.useState(props.defaultValue || '')
  let formatJSON = (json) => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2)
    } catch (e) {
      return json
    }
  }


  React.useEffect(() => {
    try {
      console.log({ error,props })
      if(error) {
        try{
          setValue(formatJSON(value))
        }catch(e){
          setValue(formatJSON(props.defaultValue))
        }
        setError(false)
        return
      }
      let parsedJSON = JSON.parse(value)
      // if we get here check if the requiredAttributes are present
      console.log({requiredAttribs: props.definition.requiredAttributes})
      if(props.definition?.requiredAttributes){
        for(let requiredAttribute of props.definition.requiredAttributes){
          // loop over the required attributes and check if they are present

          console.log("Checking for required attribute",requiredAttribute)

          if(!parsedJSON[requiredAttribute]){
            // if they are not present set the error message
            setError(true)
            setErrorMessage(`Required attribute ${requiredAttribute} is missing`)
            return
          }
        }

      }
      // update the defaultValue
      setValue(formatJSON(value))
      setError(false)
    } catch (e) {
      setValue(value)
      setError(true)
      setErrorMessage("Invalid JSON")
    }
  }, [value])
  return (
    <Box>
    <details>
    <summary>JSONField Props</summary>
    <pre>{JSON.stringify(props,null,2)}</pre>
    </details>
    {error && (
      <Box
        color="red.500"
        fontSize="sm"
        fontWeight="semibold"
        letterSpacing="wide"
        textAlign="left"
        textTransform="uppercase"
        mt="2"
      >
        {errorMessage}
      </Box>
    )}
    <Textarea
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref}
      minRows={1}
      as={ResizeTextarea}
      {...props}
      defaultValue={value || ''}
      onChange={(event)=>{

        setValue(event.target.value)

      }}
    />
    <Button
      bg={'grey.200'}
      m={2}
      onClick={() => {
        try {
          console.log("Formatting JSON")
          let json = JSON.parse(value)
          let formatted = JSON.stringify(json, null, 2)
          props.defaultValue = formatted
          setValue(formatted)
          console.log({ formatted })
          setError(false)
        } catch (e) {
          setError(true)
          setErrorMessage(e.message)
        }
      }}

    >
      Format JSON
    </Button>
    <details>
      <summary>JSON</summary>
      <pre>{value}</pre>
    </details>
    </Box>
  )
})

export default JSONField
