import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const ThreadForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.thread?.id)
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
          name="userCuid"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User cuid
        </Label>
        <TextField
          name="userCuid"
          defaultValue={props.thread?.userCuid}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="userCuid" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ThreadForm
