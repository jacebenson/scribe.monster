import { Fragment, StrictMode } from 'react'

import {
  Input,
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Spacer,
  Flex,
  Switch,
  Text,
  Textarea,
  Code,
  Checkbox,
} from '@chakra-ui/react'

import { Link, NavLink, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import MonacoEditor from '../MonacoEditor/MonacoEditor'
import PasswordField from '../PasswordField/PasswordField'
import ReferenceField from '../ReferenceField/ReferenceField'
const FormComponent = ({
  record,
  fields,
  error,
  roles,
  onSubmit,
  onDelete,
  handleSubmit,
  register,
  formState: { errors, isSubmitting },
  children,
  style,
}) => {
  if (!style) style = {}
  const { hasRole /*currentUser*/ } = useAuth()
  fields = fields.filter((field) => {
    if (!field.name) {
      console.error('Field missing name', field)
    }
    return field.name
  })
  let fieldNames = fields
    .map((field) => {
      return field.name
    })
    .sort()
  fieldNames.map((field, index) => {
    if (field === fieldNames[index - 1])
      throw `Multiple fields with name "${field}" are present`
  })
  // if fields.definitions.order is present, use it to sort the fields
  fields = fields.sort((a, b) => {
    if (a.definition?.order && b.definition?.order) {
      return a.definition?.order - b.definition?.order
    }
    if (a.definition?.order) return -1
    if (b.definition?.order) return 1
    return 0
  })

  let fieldsHtml = fields.map((field) => {
    field.pt = 2
    let html = (
      <FormControl
        pt={field.pt}
        key={field.name}
        isInvalid={errors[field.name]}
        display={field.display}
      >
        <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
        <Input
          id={field.name}
          placeholder={field.placeholder || '...' || ''}
          readOnly={field.readOnly || false}
          {...register(field.name, {
            required: field?.required || false,
            minLength: field.minLength,
            onChange: field?.onChange,
          })}
          defaultValue={record?.[field.name] || field.defaultValue}
        />
        <FormErrorMessage>
          {errors[field.name] && errors[field.name].message}
        </FormErrorMessage>
      </FormControl>
    )
    if (field.type === 'boolean') {
      html = (
        <FormControl
          pt={field.pt}
          key={field.name}
          isInvalid={errors[field.name]}
          display="flex"
          alignItems="center"
        >
          <FormLabel htmlFor={field.name}>
            {field.prettyName} {value}({record?.[field.name]?.toString()})
          </FormLabel>
          <Switch
            colorScheme="green"
            id={field.name}
            readOnly={field.readOnly || false}
            {...register(field.name, {
              required: field?.required || false,
            })}
            defaultChecked={
              record?.[field.name]?.toString() || field.defaultValue
            }
            //TODO:this is not working
          />
          <FormErrorMessage>
            {errors[field.name] && errors[field.name].message}
          </FormErrorMessage>
          <details>
            <summary>Boolean</summary>
            <Code whiteSpace={'pre-wrap'} display={'block'} p={2} m={2}>
              {JSON.stringify(debug, null, 2)}
            </Code>
          </details>
        </FormControl>
      )
    }
    if (field.type === 'password') {
      html = (
        <PasswordField
          key={field.name}
          field={field}
          errors={errors}
          readOnly={field.readOnly || false}
          register={register}
        />
      )
    }
    if (field.type === 'secret') {
      {
        /**Difference between this and password is this data is available to the form */
      }
      html = (
        <PasswordField
          key={field.name}
          field={field}
          errors={errors}
          register={register}
          readOnly={field.readOnly || false}
          defaultValue={record?.[field.name] || field.defaultValue}
        />
      )
    }
    if (field.type === 'reference') {
      try {
        html = (
          <ReferenceField key={field.name} field={field} register={register} />
        )
      } catch (error) {
        console.error(error)
      }
    }
    if (field.type === 'dateTime') {
      //Original(2022-03-10T16:41:06.000Z)
      //Displayed(2022-03-10T10:41)
      let transformedDefault = false
      let padToTwo = (value) => {
        if (typeof value !== 'string') value = value.toString()
        if (value.length === 2) return value
        return value.padStart(2, 0)
      }
      if (record?.[field.name] || field.defaultValue) {
        let fieldDate = new Date(record?.[field.name] || field.defaultValue)
        transformedDefault = `${fieldDate.getFullYear()}-${padToTwo(
          fieldDate.getMonth() + 1
        )}-${padToTwo(fieldDate.getDate())}T${padToTwo(
          fieldDate.getHours()
        )}:${padToTwo(fieldDate.getMinutes())}`
      }
      html = (
        <FormControl
          pt={field.pt}
          key={field.name}
          isInvalid={errors[field.name]}
        >
          <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
          <Input
            id={field.name}
            placeholder={field.placeholder || '...' || ''}
            readOnly={field.readOnly || false}
            type={'datetime-local'}
            {...register(field.name, {
              required: field?.required || false,
              minLength: field.minLength,
              onChange: field?.onChange,
            })}
            defaultValue={transformedDefault}
          />
          <FormErrorMessage>
            {errors[field.name] && errors[field.name].message}
          </FormErrorMessage>
        </FormControl>
      )
    }
    if (field.type === 'select') {
      // if field.options has strings, use them as both the value and the display
      // if field.options has objects, use the value and display properties
      let options = field.options.map((option) => {
        if (typeof option === 'string') {
          if (option === record?.[field.name]) {
            return (
              <option key={option} value={option} selected>
                {option}
              </option>
            )
          }
          return (
            <option key={option} value={option}>
              {option}
            </option>
          )
        }
        if (option.value === record?.[field.name]) {
          return (
            <option key={option.value} value={option.value} selected>
              {option.display}
            </option>
          )
        }
        return (
          <option key={option.value} value={option.value}>
            {option.display}
          </option>
        )
      })

      html = (
        <FormControl pt={2} key={field.name} isInvalid={errors[field.name]}>
          <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
          <Select
            defaultValue={record?.[field.name]}
            id={field.name}
            name={field.name}
            {...register(field.name, {
              required: field?.required || false,
              minLength: field.minLength,
            })}
          >
            <option>Pick one</option>
            {field.defaultOption}
            {options}
          </Select>
          <FormErrorMessage>
            {errors[field.name] && errors[field.name].message}
          </FormErrorMessage>
        </FormControl>
      )
    }
    if (field.type === 'json') {
      html = (
        <pre key={field.name}>
          {JSON.stringify(record?.[field.name], null, '  ')}
        </pre>
      )
    }
    if (field.type === 'number') {
      html = (
        <FormControl
          pt={field.pt}
          key={field.name}
          isInvalid={errors[field.name]}
        >
          <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
          <Input
            id={field.name}
            placeholder={field.placeholder || '...' || ''}
            readOnly={field.readOnly || false}
            {...register(field.name, {
              required: field?.required || false,
              minLength: field.minLength,
              onChange: field?.onChange,
            })}
            defaultValue={
              record?.[field.name]?.toString() ||
              field?.defaultValue?.toString()
            }
          />
          <FormErrorMessage>
            {errors[field.name] && errors[field.name].message}
          </FormErrorMessage>
        </FormControl>
      )
    }
    if (field.type === 'textarea') {
      html = (
        <FormControl
          pt={field.pt}
          key={field.name}
          isInvalid={errors[field.name]}
          minW={'maxContent'}
        >
          <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
          <Textarea
            spellCheck={field?.spellCheck}
            fontFamily={'monospace'}
            id={field.name}
            rows={field?.rows}
            minW={field?.minW}
            value={field?.value}
            placeholder={field?.placeholder || 'Enter text here...'}
            readOnly={field.readOnly || false}
            {...register(field.name, {
              required: field?.required || false,
              minLength: field.minLength,
              onChange: field?.onChange,
            })}
            defaultValue={
              record?.[field.name]?.toString() || field.defaultValue?.toString()
            }
          />
          {/**countCharacters and countTokens starts at zero and should show when it is zero*/}
          {(field?.countCharacters || field?.countCharacters == 0) && (
            <Text fontSize={'xs'} color={'gray.500'}>
              {field?.countCharacters || 0} characters
            </Text>
          )}

          {(field?.countTokens || field?.countTokens == 0) && (
            <Text fontSize={'xs'} color={'gray.500'}>
              {field?.countTokens || 0} tokens
            </Text>
          )}
          <FormErrorMessage>
            {errors[field.name] && errors[field.name].message}
          </FormErrorMessage>
        </FormControl>
      )
    }
    if (field.type === 'editor') {
      // useState
      html = (
        <>
          {/*from form component: {JSON.stringify(record?.[field.name])}*/}
          <MonacoEditor
            key={`${field.name}-editor`}
            field={field}
            errors={errors}
            register={register}
            readOnly={field.readOnly || false}
            record={record}
            ref={React.createRef()}
          />
        </>
      )
    }
    if (field.type === 'link') {
      console.log({ field })
      html = (
        <Box key={field.name} pt={2}>
          <Link to={routes[field.to](field.record)} key={field.name}>
            {field.prettyName}
          </Link>
        </Box>
      )
    }
    return html
  })
  return (
    <StrictMode>
      <Fragment>
        <Box key={'formComponentBox'} bg={'white'} p={3} style={style || ''}>
          {error?.graphQLErrors[0]?.message && (
            <Alert status="error">
              <AlertIcon />
              {error?.graphQLErrors[0]?.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {fieldsHtml}
            <Box key={'_actions'}>
              {!children ? ( // if children is passed, we don't want to show the submit button }
                <Fragment>
                  <Flex>
                    <Button
                      mt={4}
                      colorScheme="green"
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                    <Spacer />
                    {hasRole([roles.deleteRecord].concat(['admin'])) && (
                      <Button
                        mt={4}
                        colorScheme="red"
                        isLoading={isSubmitting}
                        type="button"
                        onClick={onDelete}
                      >
                        Delete
                      </Button>
                    )}
                  </Flex>
                </Fragment>
              ) : (
                children
              )}
            </Box>
          </form>
        </Box>
      </Fragment>
    </StrictMode>
  )
}

export default FormComponent
