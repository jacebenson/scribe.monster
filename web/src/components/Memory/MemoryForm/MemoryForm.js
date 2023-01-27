import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const MemoryForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.memory?.id)
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
          name="content"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Content
        </Label>
        <TextField
          name="content"
          defaultValue={props.memory?.content}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="content" className="rw-field-error" />

        <Label
          name="vector"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Vector
        </Label>
        <TextField
          name="vector"
          defaultValue={props.memory?.vector}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="vector" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>
        <CheckboxField
          name="active"
          defaultChecked={props.memory?.active}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="active" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MemoryForm
