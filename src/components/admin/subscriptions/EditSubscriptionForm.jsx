import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { Form } from 'semantic-ui-react';

import { FormInput, FormRadio } from '../../utils/FormHelpers';

const validationSchema = new Yup.object().shape({
  name: Yup.string().min(4, 'Liian lyhyt nimi').required('Nimi puuttuu'),
  talk: Yup.number().required('Puhemäärä puuttuu'),
  sms: Yup.number().required('Viesimäärä puuttuu'),
  speed: Yup.number().required('Nettinopeus puuttuu'),
  unlimited: Yup.boolean().required('Määritä onko netti rajaton vai ei'),
  eu: Yup.number().required('Eu data puuttuu'),
  active: Yup.boolean().required('Onko liittymä ahtiivinen vai ei'),
  price: Yup.number().required('Kuukausimaksu puuttuu'),
});

const EditSubscriptionForm = ({ subRef, handleEditSub }) => {
  return (
    <Formik
      initialValues={{
        name: subRef.name,
        talk: subRef.talk === 'Rajaton' ? 0 : subRef.talk,
        talkUnlimited: subRef.talk === 'Rajaton' ? true : false,
        sms: subRef.sms === 'Rajaton' ? 0 : subRef.sms,
        smsUnlimited: subRef.sms === 'Rajaton' ? true : false,
        speed: subRef.speed,
        unlimited: subRef.unlimited,
        eu: subRef.eu,
        active: subRef.active,
        price: subRef.price,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {        
        handleEditSub({
          id: subRef.id,
          name: values.name,
          talk: values.talkUnlimited ? 'Rajaton' : String(values.talk),
          sms: values.smsUnlimited ? 'Rajaton' : String(values.sms),
          speed: String(values.speed),
          unlimited: values.unlimited,
          eu: values.eu,
          active: values.active,
          price: String(values.price),
        });
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit} id="editSubscriptionForm">
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
          <Form.Group>
            <FormInput
              label="Puheaika"
              name="talk"
              type="number"
              disabled={props.values.talkUnlimited ? true : false}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.talk}
              error={!props.values.talkUnlimited && props.errors.talk}
              touched={props.touched.talk}
            />
            <FormRadio
              label="Rajaton puhe"
              id="talkUnlimited"
              name="talkUnlimited"
              checked={props.values.talkUnlimited === true}
              onChange={props.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <FormInput
              label="Viestejä"
              name="sms"
              type="number"
              disabled={props.values.smsUnlimited ? true : false}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.sms}
              error={!props.values.smsUnlimited && props.errors.sms}
              touched={props.touched.sms}
            />
            <FormRadio
              label="Rajattomat viestit"
              id="smsUnlimited"
              name="smsUnlimited"
              checked={props.values.smsUnlimited === true}
              onChange={props.handleChange}
            />
          </Form.Group>
          <Form.Group>
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
            <FormRadio
              label="Rajaton netti"
              id="unlimited"
              name="unlimited"
              checked={props.values.unlimited === true}
              onChange={props.handleChange}
            />
          </Form.Group>
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

export default EditSubscriptionForm;
