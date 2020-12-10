import React from 'react';
import { useQuery } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Form, Button, Header, Label, Radio } from 'semantic-ui-react';

import { ALL_OPERATORS } from '../../../../queries/subscription';
import { OperatorLogo } from '../../../utils/OperatorLogo';

const validationSchema = new Yup.object().shape({
  name: Yup.string().min(4, 'Liian lyhyt nimi').required('Nimi puuttuu'),
  type: Yup.string().required('Tekniikka puuttuu'),
  speed: Yup.number().required('Nettinopeus puuttuu'),
  eu: Yup.number().required('Eu data puuttuu'),
  active: Yup.boolean().required('Onko liittymä ahtiivinen vai ei'),
  price: Yup.number().required('Kuukausimaksu puuttuu'),
});

const AddNetSubForm = ({
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
            style={{ backgroundColor: 'white' }}
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

  const netTypes = ['4G', '5G', 'ADSL', 'VDSL', 'kaapeli', 'valokuitu']

  return (
    <Formik
      initialValues={{
        name: '',
        type: '',
        speed: undefined,
        eu: undefined,
        active: true,
        price: undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        values.price = String(values.price);
        values.speed = String(values.speed);

        handleAddSubscription({
          operator: selectedOperator,
          name: values.name,
          type: values.type,
          speed: values.speed,
          eu: values.eu,
          active: values.active,
          price: values.price,
        });
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit} id="addNetSubscription">
          <Header>
            <OperatorLogo
              operator={
                operators.data.allOperators.find(
                  (opRef) => opRef.id === selectedOperator
                ).name
              }
            />
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
            <Form.Field><Form.Field
                  label="Tekniikka"
                  name="type"
                  control="select"                  
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                >
                  <option></option>
                  {netTypes                    
                    .map((typeRef) => (
                      <option key={typeRef} value={typeRef}>
                        {typeRef}
                      </option>
                    ))}
                </Form.Field>              
              {!props.values.type &&
                props.touched.type &&
                errorMessage(props.errors.type)}
            </Form.Field>

            <Form.Field>
              <Form.Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="speed"
                label="Nettinopeus"
                placeholder="Nettinopeus"
              />
              {props.touched.speed && errorMessage(props.errors.speed)}
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Form.Input
                type="number"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="eu"
                label="Eu data"
                placeholder="Eu data"
              />
              {props.touched.eu && errorMessage(props.errors.eu)}
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="price"
                label="Kuukausimaksu"
                placeholder="Kuukausimaksu"
              />
              {props.touched.price && errorMessage(props.errors.price)}
            </Form.Field>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default AddNetSubForm;
