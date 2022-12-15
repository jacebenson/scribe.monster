import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const ScribeRequestForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.scribeRequest?.id)
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
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        <NumberField
          name="userId"
          defaultValue={props.scribeRequest?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="modelInstanceId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Model instance id
        </Label>
        <TextField
          name="modelInstanceId"
          defaultValue={props.scribeRequest?.modelInstanceId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="modelInstanceId" className="rw-field-error" />

        <Label
          name="queryTokens"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Query tokens
        </Label>
        <NumberField
          name="queryTokens"
          defaultValue={props.scribeRequest?.queryTokens}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="queryTokens" className="rw-field-error" />

        <Label
          name="responseTokens"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Response tokens
        </Label>
        <NumberField
          name="responseTokens"
          defaultValue={props.scribeRequest?.responseTokens}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="responseTokens" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ScribeRequestForm
