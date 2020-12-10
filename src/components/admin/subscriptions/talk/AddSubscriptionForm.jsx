import React from 'react';
import { useQuery } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Form, Button, Header, Label, Radio } from 'semantic-ui-react';

import { ALL_OPERATORS } from '../../../../queries/subscription';
import { OperatorLogo } from '../../../utils/OperatorLogo';

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

const AddSubscriptionForm = ({
  selectedOperator,
  setSelectedOperator,
  handleAddSubscription,
}) => {
  const operators = useQuery(ALL_OPERATORS, {
    context: { scope: 'api://gappi/api/user' },
  });

  if (operators.loading) {
    return null;
  }
  if (!selectedOperator) {
    return (
      <>
        <Header as="h2">Valitse operaattori</Header>
        {operators.data.allOperators.map((opRef) => (
          <Button
            style={{backgroundColor: 'white'}}
            key={opRef.id}
            value={opRef.id}
            onClick={() => setSelectedOperator(opRef.id)}
          >
            <OperatorLogo operator={opRef.name} />
          </Button>
        ))}
      </>
    );
  }

  const errorMessage = (field) => {
    if (!field) {
      return null;
    }
    return (
      <Label pointing color="yellow">
        {field}
      </Label>
    );
  };

  return (
    <Formik
      initialValues={{
        name: '',
        talk: 0,
        talkUnlimited: true,
        sms: 0,
        smsUnlimited: true,
        speed: undefined,
        unlimited: true,
        eu: undefined,
        active: true,
        price: undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (values.talkUnlimited) {
          values.talk = 'Rajaton';
        } else {
          values.talk = String(values.talk);
        }
        if (values.smsUnlimited) {
          values.sms = 'Rajaton';
        } else {
          values.sms = String(values.sms);
        }
        values.price = String(values.price);
        values.speed = String(values.speed)
        

        handleAddSubscription({
          operator: selectedOperator,
          name: values.name,
          talk: values.talk,
          sms: values.sms,
          speed: values.speed,
          unlimited: values.unlimited,
          eu: values.eu,
          active: values.active,
          price: values.price,
        });
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit} id="addSubscription">
          <Header>
            <OperatorLogo operator={
              operators.data.allOperators.find(
                (opRef) => opRef.id === selectedOperator
              ).name
            } />         
          </Header>
          <Form.Group>
            <div>
              <Form.Input
                type="text"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                name="name"
                label="Liittymän nimi"
                placeholder="Nimi"
              />
              {props.touched.name && errorMessage(props.errors.name)}
            </div>
            <Form.Group className="radioLabelGroup">
              <Form.Field label="Aktiivinen"></Form.Field>
              <Radio
                id="active"
                type="checkbox"
                toggle
                name="active"
                checked={props.values.active === true}
                onChange={props.handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Input
                type="number"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="talk"
                label="Puheaika"
                placeholder="Puheaika"
              />
              {!props.values.talkUnlimited &&
                props.touched.talk &&
                errorMessage(props.errors.talk)}
            </div>
            <Form.Group className="radioLabelGroup">
              <Form.Field label="Rajaton puhe"></Form.Field>
              <Radio
                id="talkUnlimited"
                type="checkbox"
                toggle
                name="talkUnlimited"
                checked={props.values.talkUnlimited === true}
                onChange={props.handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Input
                type="number"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="sms"
                label="Viesimäärä"
                placeholder="Viesimäärä"
              />
              {!props.values.smsUnlimited &&
                props.touched.sms &&
                errorMessage(props.errors.sms)}
            </div>
            <Form.Group className="radioLabelGroup">
              <Form.Field label="Rajaton sms"></Form.Field>
              <Radio
                id="smsUnlimited"
                type="checkbox"
                toggle
                name="smsUnlimited"
                checked={props.values.smsUnlimited === true}
                onChange={props.handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="speed"
                label="Nettinopeus"
                placeholder="Nettinopeus"
              />
              {props.touched.speed && errorMessage(props.errors.speed)}
            </div>
            <Form.Group className="radioLabelGroup">
              <Form.Field label="Rajaton netti"></Form.Field>
              <Radio
                id="unlimited"
                type="checkbox"
                toggle
                name="unlimited"
                checked={props.values.unlimited === true}
                onChange={props.handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Input
                type="number"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="eu"
                label="Eu data"
                placeholder="Eu data"
              />
              {props.touched.eu && errorMessage(props.errors.eu)}
            </div>
            <div>
              <Form.Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="price"
                label="Kuukausimaksu"
                placeholder="Kuukausimaksu"
              />
              {props.touched.price && errorMessage(props.errors.price)}
            </div>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default AddSubscriptionForm;
