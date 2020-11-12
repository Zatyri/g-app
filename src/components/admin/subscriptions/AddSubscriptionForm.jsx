import { Formik } from 'formik';
import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const AddSubscriptionForm = ({closeModal}) => {
  return (
    <Formik
      initialValues={{ operator: 'Telia' }}
      onSubmit={(values) => {
        console.log(values);
        closeModal();
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit} id='addSubscription'>          
            <Form.Input
              type="text"
              label="Operaattori"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.operator}
              name="operator"
            />  
        </Form>
      )}
    </Formik>
  );
};

export default AddSubscriptionForm;
