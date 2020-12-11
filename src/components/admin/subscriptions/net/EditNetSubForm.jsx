import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { Form } from 'semantic-ui-react';

import { FormInput, FormRadio } from '../../../utils/FormHelpers';

const validationSchema = new Yup.object().shape({
  name: Yup.string().min(4, 'Liian lyhyt nimi').required('Nimi puuttuu'),
  type: Yup.string().required('Tekniikka puuttuu'),
  speed: Yup.number().required('Nettinopeus puuttuu'),
  eu: Yup.number().required('Eu data puuttuu'),
  active: Yup.boolean().required('Onko liittymä ahtiivinen vai ei'),
  price: Yup.number().required('Kuukausimaksu puuttuu'),
});

const EditNetSubForm = ({ subRef, handleEditSub }) => {
  const netTypes = ['4G', '5G', 'ADSL', 'VDSL', 'kaapeli', 'valokuitu'];

  console.log(subRef);

  return (
    <Formik
      initialValues={{
        name: subRef.name,
        type: subRef.type,
        speed: subRef.speed,
        eu: subRef.eu,
        active: subRef.active,
        price: subRef.price,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleEditSub({
          id: subRef.id,
          name: values.name,
          type: values.type,
          speed: String(values.speed),
          eu: values.eu,
          active: values.active,
          price: String(values.price),
        });
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit} id="editNetSubscriptionForm">
          <Form.Group>
            <FormInput
              label="Nimi"
              name="name"
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              error={props.errors.name}
              touched={props.touched.name}
            />

            <FormRadio
              label="Aktiivinen"
              id="active"
              name="active"
              checked={props.values.active === true}
              onChange={props.handleChange}
            />
          </Form.Group>

          <Form.Field>
            <Form.Field
              label="Tekniikka"
              name="type"
              control="select"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.type}
            >
              <option></option>
              {netTypes.map((typeRef) => (
                <option key={typeRef} value={typeRef}>
                  {typeRef}
                </option>
              ))}
            </Form.Field>
          </Form.Field>

          <FormInput
            label="Nettinopeus"
            name="speed"
            type="number"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.speed}
            error={props.errors.speed}
            touched={props.touched.speed}
          />

          <Form.Group>
            <FormInput
              label="Eu data"
              name="eu"
              type="number"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.eu}
              error={props.errors.eu}
              touched={props.touched.eu}
            />
            <FormInput
              label="Hinta"
              name="price"
              type="number"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.price}
              error={props.errors.price}
              touched={props.touched.price}
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default EditNetSubForm;
