import { Fragment, useEffect, useState } from 'react'

import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Center,
  Icon,
  Box,
  Button,
  Spacer,
  Text,
  Flex,
  Link,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { MdAccountCircle, MdOpenInNew } from 'react-icons/md'

//import { /*navigate,*/ routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
const ASK_STEW = gql`
  mutation createQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      cuid
      answer
      rephrasedText
      answeredAt
      answeredBy
      threadCuid
      context
      thread {
        question {
          text
          answer
          state
        }
      }
    }
  }
`
const AskStew = () => {
  let now = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  }
  let [text, setText] = useState('')
  let [contentRows, setContentRows] = useState(0)
  let [messages, setMessages] = useState([
    {
      message:
        "Hello, I am Stew. Ask me anything.  I'm mostly familiar with ServiceNow topics.",
      name: 'stew',
      when: now(),
    },
  ])
  let [thread, setThread] = useState('')
  useEffect(() => {
    // get the last message and scroll to it
    const lastMessage = document.querySelector('.chat-message:last-child')
    if (lastMessage) {
      lastMessage.scrollIntoView()
    }
  }, [messages])
  const [createQuestion, { loading, error }] = useMutation(ASK_STEW, {
    onCompleted: (response) => {
      console.log({ function: 'useMutation.onCompleted', response })
      toast.success('Looking into it...')
      console.log('createQuestion', createQuestion, response)
      //setAnswer(response.stewQuestion.answer)
      setMessages([
        ...messages,
        {
          message: response.createQuestion.answer.trim(),
          context: JSON.parse(response.createQuestion.context),
          name: 'stew',
          when: now(),
        },
      ])
      //navigate(routes.memories())
      setThread(response.createQuestion.threadCuid)
    },
    onError: (error) => {
      console.log({ function: 'useMutation.onError', error })
      toast.error(error.message)
    },
  })
  const onSubmit = async (data) => {
    console.log({ function: 'askStew component', data })
    if (!data.threadCuid) delete data.threadCuid
    setMessages([
      ...messages,
      {
        message: data.text,
        name: 'You',
        // hh:mm
        when: now(),
      },
    ])
    // clear the text area
    setText('')
    await onSave(data)
    // get the last message and scroll to it
  }

  const onSave = async (input) => {
    await createQuestion({ variables: { input } })
  }
  const fields = [
    {
      value: text,
      name: 'text',
      prettyName: '',
      placeholder: ` `,
      //type: 'textarea',
      required: 'This is required',
      minW: '100%',
      rows: contentRows,
      onChange: (e) => {
        const height = Math.floor(e.target.scrollHeight / 22)
        setContentRows(height)
        setText(e.target.value)
      },
      spellCheck: 'true',
    },
    {
      name: 'threadCuid',
      prettyName: 'Thread',
      placeholder: ` `,
      readOnly: true,
      defaultValue: thread || '',
      //type: 'hidden',
      display: 'none',
    },
  ]

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const chatMessage = ({ message, name, when, context }) => (
    <Flex
      key={message + when}
      p={4}
      /**make background color alternate if stew or not
       */
      backgroundColor={name == 'stew' ? 'gray.100' : 'gray.200'}
      className="chat-message"
    >
      {/**  Put this form to the bottom of the screen */}

      <Center w="100px" minW={'100px'}>
        {name == 'stew' ? (
          <Box
            as="img"
            src={name == 'stew' ? '/favicon-32x32.png' : '/jace.jpeg'}
            alt=""
            width="32px"
            height="32px"
            minW={'32px'}
          />
        ) : (
          <Icon as={MdAccountCircle} boxSize={18} />
        )}
      </Center>
      {/**Text should keep its whitespace and wrap*/}
      <Box>
        <Text as="p" textStyle="p" whiteSpace={'pre-wrap'}>
          {message}
        </Text>
        {context && (
          <Box>
            {/**A small light line, listing the paragaphs and links */}
            <Box as="ul" listStyleType="none" p={0} m={0}>
              {context.map((sourceData, index) => (
                <Box as="li" key={index} p={0} m={0} fontSize={'10px'}>
                  {sourceData.sourceUrl && (
                    <Link href={sourceData.sourceUrl} isExternal>
                      {sourceData.score}% {sourceData.source}
                      <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                  {!sourceData.sourceUrl && (
                    <Text>
                      {sourceData.score}% {sourceData.source}
                    </Text>
                  )}
                </Box>
              ))}
            </Box>

            {/*<Box
              as="pre"
              p={2}
              mt={2}
              mb={2}
              backgroundColor="gray.100"
              borderRadius="md"
              whiteSpace={'pre-wrap'}
            >
              {JSON.stringify(context, null, 2)}
            </Box>*/}
          </Box>
        )}
      </Box>
      <Spacer />
      {/**small */}
      <Text minW={'50px'} fontSize={'12px'}>
        {when}
      </Text>
    </Flex>
  )
  return (
    <Fragment>
      <MetaTags
        title="Ask Stew"
        description="Ask Stew a question"
        /* you should un-comment description and add a unique description, 155 characters or less
  You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      {/**This is a chat dialog form, the top is the history oldest on top, and newest on bottom with a single text box and a button next to it */}
      {/**this will be loaded from the state */}
      <Box h={'75vh'} overflowY={'scroll'}>
        {messages.map((message) => chatMessage(message))}
      </Box>

      <FormComponent
        fields={fields}
        roles={{}}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        //returnLink={routes.memories()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
        style={{ height: '25vh', position: 'fixed', bottom: 0, width: '100%' }}
      >
        {' '}
        <Button
          mt={4}
          w={'100%'}
          backgroundColor={'green'}
          rounded={'full'}
          size={'lg'}
          fontWeight={'normal'}
          px={6}
          isLoading={isSubmitting}
          type="submit"
        >
          Ask
        </Button>
      </FormComponent>
    </Fragment>
  )
}

export default AskStew

/*
<Text as="p" textStyle="p" whiteSpace={'pre'}>
        {answer}
      </Text>
      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        //returnLink={routes.memories()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      >

      </FormComponent>
      */
