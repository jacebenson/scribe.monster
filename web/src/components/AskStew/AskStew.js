import { Fragment, useState } from 'react'

import { Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

//import { /*navigate,*/ routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
const ASK_STEW = gql`
  mutation stewQuestion($input: CreateQuestionInput!) {
    stewQuestion(input: $input) {
      answer
      context
      cost
      tokenUsage
    }
  }
`
const AskStew = () => {
  let [answer, setAnswer] = useState('')
  let [contentRows, setContentRows] = useState(0)
  const [stewQuestion, { loading, error }] = useMutation(ASK_STEW, {
    onCompleted: (response) => {
      toast.success('Question Answered')
      console.log('stewQuestion', stewQuestion, response)
      setAnswer(response.stewQuestion.answer)
      //navigate(routes.memories())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const onSubmit = async (data) => {
    await onSave(data)
  }

  const onSave = async (input) => {
    await stewQuestion({ variables: { input } })
  }
  const fields = [
    {
      name: 'question',
      prettyName: 'Question',
      type: 'textarea',
      required: 'This is required',
      rows: contentRows,
      onChange: (e) => {
        const height = Math.floor(e.target.scrollHeight / 22)
        setContentRows(height)
      },
      spellCheck: 'true',
    },
  ]
  const roles = {}
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title="Ask Stew"
        description="Ask Stew a question"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <Text as="h2" textStyle="h2">
        Ask Stew
      </Text>
      <Text as="p" textStyle="p">
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
      />
    </Fragment>
  )
}

export default AskStew
