import {
  //Input,
  InputGroup,
  //InputRightElement,
  //Button,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react'
//import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react'

const MonacoEditor = ({ record, field, errors, register }) => {
  const [value, setValue] = React.useState(field?.value || field?.defaultValue)
  let handleChange = (value) => {
    console.log({ function: 'handleChange', value })
    setValue(value)
  }
  return (
    <FormControl
      key={field.name}
      pt={field.pt}
      isInvalid={errors?.[field.name]}
    >
      <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
      <InputGroup size="md">
        <Textarea
          id={field.name}
          pr="4.5rem"
          type={'text'}
          defaultValue={record?.[field.name] || field.defaultValue}
          placeholder={field.placeholder || 'Enter password'}
          disabled={field?.disabled}
          readOnly={field?.readOnly || false}
          value={value}
          {...register(field.name, {
            //            required: field?.required || false,
            //            minLength: field.minLength,
            // value: value,
          })}
        />
      </InputGroup>
      {/*<Editor
        height={field?.height || '20vh'}
        defaultLanguage={'javascript'}
        //defaultValue={
        //  record?.[field.name]?.toString() || field.defaultValue?.toString()
        //}
        //id={field.name}
        placeholder={field.placeholder || '...' || ''}
        readOnly={field.readOnly || false}
        onChange={handleChange}
        // when the editor is ready, we can get the editor instance
        // and set the value of the editor
        //{...register(field.name, {
        //  required: field?.required || false,
        //  minLength: field.minLength,
        //  //onChange: field?.onChange,
        //  onChange: (value) => {
        //    console.log({ value })
        //  },
        //})}
      />*/}
      <FormErrorMessage>
        {errors?.[field.name] && errors?.[field.name].message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default MonacoEditor
