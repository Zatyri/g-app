import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Label } from 'semantic-ui-react';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Käyttäjänimi liian lyhyt')
    .max(15, 'Käyttäjänimi liian pitkä')
    .required('Käyttäjänimi puuttuu'),
  name: Yup.string()
    .min(4, 'Nimi liian lyhyt')
    .max(15, 'Nimi liian pitkä')
    .required('Nimi puuttuu'),
  password: Yup.string()
    .min(8, 'Salasana liian lyhyt')
    .required('Salasana puuttuu'),
  store: Yup.number()  
    .required('Talon numero puuttuu'),
});

const AddUserForm = (props) => {
  return (
    <Formik
      initialValues={{
        name: '',
        username: '',
        store: '0000',
        type: 'store',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        props.handleAddUser(values)
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Form.Input
            type="text"
            onChange={props.handleChange}
            value={props.values.name}
            name="name"
            icon="tag"
            iconPosition="left"
            label="Nimi"
            placeholder="Nimi"
          />
          {props.errors.name && (
            <Label className="errorMessage" pointing color="yellow">
              {props.errors.name}
            </Label>
          )}
          <Form.Input
            type="text"
            onChange={props.handleChange}
            value={props.values.username}
            name="username"
            icon="user"
            iconPosition="left"
            label="Käyttäjänimi"
            placeholder="Käyttäjänimi"
          />
          {props.errors.username && (
            <Label className="errorMessage" pointing color="yellow">
              {props.errors.username}
            </Label>
          )}
          <Form.Input
            type="password"
            onChange={props.handleChange}
            value={props.values.password}
            name="password"
            icon="lock"
            iconPosition="left"
            label="Salasana"
            placeholder="Salasana"
          />
          {props.errors.password && (
            <Label className="errorMessage" pointing color="yellow">
              {props.errors.password}
            </Label>
          )}
          <Form.Input
            type="number"
            onChange={props.handleChange}
            value={props.values.store}
            name="store"
            icon="warehouse"
            iconPosition="left"
            label="Talo"
          />
          {props.errors.store && (
            <Label className="errorMessage" pointing color="yellow">
              {props.errors.store}
            </Label>
          )}
          <Form.Field
            label="Rooli"
            control="select"
            name="type"
            onChange={props.handleChange}
            value={props.values.type}
          >
            <option value="admin">admin</option>
            <option value="storeAdmin">storeAdmin</option>
            <option value="store">store</option>
          </Form.Field>
          {props.errors.type && (
            <Label className="errorMessage" pointing color="yellow">
              {props.errors.type}
            </Label>
          )}
          <Button type="submit" positive>
            Lisää
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddUserForm;
