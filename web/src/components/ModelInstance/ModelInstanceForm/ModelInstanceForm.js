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

const ModelInstanceForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.modelInstance?.id)
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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.modelInstance?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="version"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Version
        </Label>
        <TextField
          name="version"
          defaultValue={props.modelInstance?.version}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="version" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>
        <TextField
          name="description"
          defaultValue={props.modelInstance?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="endpoint"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Endpoint
        </Label>
        <TextField
          name="endpoint"
          defaultValue={props.modelInstance?.endpoint}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="endpoint" className="rw-field-error" />

        <Label
          name="cost"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cost
        </Label>
        <TextField
          name="cost"
          defaultValue={props.modelInstance?.cost}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="cost" className="rw-field-error" />

        <Label
          name="price"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Price
        </Label>
        <TextField
          name="price"
          defaultValue={props.modelInstance?.price}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="price" className="rw-field-error" />

        <Label
          name="model"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Model
        </Label>
        <TextField
          name="model"
          defaultValue={props.modelInstance?.model}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="model" className="rw-field-error" />

        <Label
          name="prompt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Prompt
        </Label>
        <TextField
          name="prompt"
          defaultValue={props.modelInstance?.prompt}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="prompt" className="rw-field-error" />

        <Label
          name="temperature"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Temperature
        </Label>
        <TextField
          name="temperature"
          defaultValue={props.modelInstance?.temperature}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="temperature" className="rw-field-error" />

        <Label
          name="maxTokens"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Max tokens
        </Label>
        <NumberField
          name="maxTokens"
          defaultValue={props.modelInstance?.maxTokens}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="maxTokens" className="rw-field-error" />

        <Label
          name="topP"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Top p
        </Label>
        <NumberField
          name="topP"
          defaultValue={props.modelInstance?.topP}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="topP" className="rw-field-error" />

        <Label
          name="bestOf"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Best of
        </Label>
        <NumberField
          name="bestOf"
          defaultValue={props.modelInstance?.bestOf}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="bestOf" className="rw-field-error" />

        <Label
          name="n"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          N
        </Label>
        <NumberField
          name="n"
          defaultValue={props.modelInstance?.n}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="n" className="rw-field-error" />

        <Label
          name="stop"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Stop
        </Label>
        <TextField
          name="stop"
          defaultValue={props.modelInstance?.stop}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="stop" className="rw-field-error" />

        <Label
          name="frequencyPenalty"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Frequency penalty
        </Label>
        <TextField
          name="frequencyPenalty"
          defaultValue={props.modelInstance?.frequencyPenalty}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="frequencyPenalty" className="rw-field-error" />

        <Label
          name="presencePenalty"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Presence penalty
        </Label>
        <TextField
          name="presencePenalty"
          defaultValue={props.modelInstance?.presencePenalty}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="presencePenalty" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ModelInstanceForm
