import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const PromptTrainingDataForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.promptTrainingData?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="prompt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Prompt
        </Label>
        <TextField
          name="prompt"
          defaultValue={props.promptTrainingData?.prompt}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="prompt" className="rw-field-error" />

        <Label
          name="table"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Table
        </Label>
        <TextField
          name="table"
          defaultValue={props.promptTrainingData?.table}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="table" className="rw-field-error" />

        <Label
          name="action"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Action
        </Label>
        <TextField
          name="action"
          defaultValue={props.promptTrainingData?.action}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="action" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>
        <TextField
          name="type"
          defaultValue={props.promptTrainingData?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="completion"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Completion
        </Label>
        <TextField
          name="completion"
          defaultValue={props.promptTrainingData?.completion}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="completion" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        <NumberField
          name="userId"
          defaultValue={props.promptTrainingData?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PromptTrainingDataForm
