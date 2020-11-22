import React from 'react';
import {
  Dimmer,
  Form,
  Icon,
  Input,
  Label,
  Loader,
  Placeholder,
  Radio,
  Segment,
} from 'semantic-ui-react';

export const XorVIcon = ({ value }) => {
  if (typeof value !== 'boolean') {
    return null;
  }
  return value ? (
    <Icon name="check circle" color="green" />
  ) : (
    <Icon name="x" color="red" />
  );
};

export const PlaceholderTable = () => {
  return (
    <Placeholder className="placeholderContainer">
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  );
};

export const Loading = () => {
  return (
    <div>
      <Segment style={{ height: '300px' }}>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Segment>
    </div>
  );
};

export const ErrorMessage = ({ error }) => {
  console.log(error);

  return <div>Virhe</div>;
};

export const inputError = (field) => {
  return (
    <Label pointing color="yellow">
      {field}
    </Label>
  );
};

export const FormInput = ({
  label,
  name,
  type,
  onChange,
  onBlur,
  value,
  error,
  touched,
  disabled,
  placeholder,
}) => {
  return (
    <Form.Field>
      <Form.Field label={label}></Form.Field>
      <Input
      fluid
        disabled={disabled}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        step={type === 'number' && '.01'}
      />
      {touched && error ? inputError(error) : null}
    </Form.Field>
  );
};

export const FormRadio = ({ label, id, name, checked, onChange, disabled }) => {
  return (
    <Form.Input>
      <Form.Group className="radioLabelGroup">
        <Form.Field label={label}></Form.Field>
        <Radio
          disabled={disabled}
          id={id}
          type="checkbox"
          toggle
          name={name}
          checked={checked}
          onChange={onChange}
        />
      </Form.Group>
    </Form.Input>
  );
};
