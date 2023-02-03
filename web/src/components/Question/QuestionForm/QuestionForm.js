import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const QuestionForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.question?.id)
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
          defaultValue={props.question?.userCuid}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="userCuid" className="rw-field-error" />

        <Label
          name="state"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          State
        </Label>
        <TextField
          name="state"
          defaultValue={props.question?.state}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="state" className="rw-field-error" />

        <Label
          name="text"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Text
        </Label>
        <TextField
          name="text"
          defaultValue={props.question?.text}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="text" className="rw-field-error" />

        <Label
          name="textVector"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Text vector
        </Label>
        <TextField
          name="textVector"
          defaultValue={props.question?.textVector}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="textVector" className="rw-field-error" />

        <Label
          name="rephrasedText"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rephrased text
        </Label>
        <TextField
          name="rephrasedText"
          defaultValue={props.question?.rephrasedText}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="rephrasedText" className="rw-field-error" />

        <Label
          name="rephrasedTextVector"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rephrased text vector
        </Label>
        <TextField
          name="rephrasedTextVector"
          defaultValue={props.question?.rephrasedTextVector}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="rephrasedTextVector" className="rw-field-error" />

        <Label
          name="answer"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Answer
        </Label>
        <TextField
          name="answer"
          defaultValue={props.question?.answer}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="answer" className="rw-field-error" />

        <Label
          name="answeredAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Answered at
        </Label>
        <DatetimeLocalField
          name="answeredAt"
          defaultValue={props.question?.answeredAt}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="answeredAt" className="rw-field-error" />

        <Label
          name="answeredBy"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Answered by
        </Label>
        <TextField
          name="answeredBy"
          defaultValue={props.question?.answeredBy}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="answeredBy" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>
        <CheckboxField
          name="active"
          defaultChecked={props.question?.active}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="active" className="rw-field-error" />

        <Label
          name="threadCuid"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Thread cuid
        </Label>
        <TextField
          name="threadCuid"
          defaultValue={props.question?.threadCuid}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="threadCuid" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default QuestionForm
