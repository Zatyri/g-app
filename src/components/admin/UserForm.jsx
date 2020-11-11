import { Formik } from 'formik';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const UserForm = (props) => {
  return (
    <Formik
      initialValues={{
        name: props.user.name,
        type: props.user.type,
        store: props.user.store,
        id: props.user.id,
      }}
      onSubmit={(values) => {
        props.handleModify(values);
        props.modalOpen(false);
      }}
    >
      {(formProps) => (
        <Form onSubmit={formProps.handleSubmit}>
          <Form.Field>
            <label>Nimi</label>
            <input
              name="name"
              type="text"
              onChange={formProps.handleChange}
              value={formProps.values.name}
            />
          </Form.Field>
          <Form.Field>
            <label>Talo</label>
            <input
              name="store"
              type="number"
              onChange={formProps.handleChange}
              value={formProps.values.store}
            />
          </Form.Field>
          <Form.Field>
            <label>Rooli</label>

            <select
              name="type"
              onChange={formProps.handleChange}
              value={formProps.values.type}
            >
              <option value="admin">admin</option>
              <option value="store">store</option>
              <option value="storeAdmin">storeAdmin</option>
            </select>
          </Form.Field>
          <Button type="submit" content="Tallenna" icon="checkmark" positive />
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
