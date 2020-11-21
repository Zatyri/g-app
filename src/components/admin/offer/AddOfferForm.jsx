import { Formik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Button, Form, Header, Label } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import {
  ALL_ACTIVE_SUBSCRIPTIONS,
  ALL_OPERATORS,
} from '../../../queries/subscription';
import {
  ErrorMessage,
  FormInput,
  FormRadio,
  Loading,
} from '../../utils/FormHelpers';
import { OperatorLogo } from '../../utils/OperatorLogo';

const validationSchema = new Yup.object().shape({
  id: Yup.string().required('Valitse liittymän nimi'),
  offer: Yup.number().required('Syötä tarjoushinta'),
  offerLength: Yup.number().required('Syötä tarjouksen pituus'),
  oneTimeDiscount: Yup.number(),
  offerValue: Yup.number().min(0).max(5).required('Valitse tarjouksen luokka'),
});

const AddOfferForm = ({ handleAddOffer }) => {
  const [selectedOperator, setSelectedOperator] = useState();
  const allOperators = useQuery(ALL_OPERATORS);
  const allActiveSubscription = useQuery(ALL_ACTIVE_SUBSCRIPTIONS);

  if (allOperators.loading || allActiveSubscription.loading) {
    return <Loading />;
  }

  if (allOperators.error) {
    return <ErrorMessage error={allOperators.error} />;
  }

  if (!selectedOperator) {
    return (
      <>
        <Header as="h2">Valitse operaattori</Header>
        {allOperators.data.allOperators.map((opRef) => (
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
  return (
    <Formik
      initialValues={{
        id: undefined,
        offer: '',
        offerLength: 12,
        bindingOffer: false,
        oneTimeDiscount: 0,
        offerValue: 3,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        values.offerLength = parseInt(values.offerLength);
        values.offerValue = parseInt(values.offerValue)
        handleAddOffer(values);
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit} id="addOfferForm">
          <Form.Field
            name="id"
            label="Valse liittymä"
            control="select"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          >
            <option></option>
            {allActiveSubscription.data.allActiveSubscriptions
              .filter(
                (subRef) =>
                  selectedOperator === subRef.operator.id &&
                  subRef.hasOffer !== true
              )
              .map((subRef) => (
                <option key={subRef.id} value={subRef.id}>
                  {subRef.name}
                </option>
              ))}
          </Form.Field>
          {props.touched.id && props.errors.id ? (
            <Label pointing color="yellow">
              {props.errors.id}
            </Label>
          ) : null}

          <FormInput
            label="Tarjoushinta"
            disabled={props.values.id ? false : true}
            name="offer"
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.offer}
            touched={props.touched.offer}
          />
          <Form.Group>
            <Form.Field
              disabled={props.values.id ? false : true}
              name="offerLength"
              label="Tarjouksen kesto (kk)"
              control="select"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            >
              <option value="12">12</option>
              <option value="24">24</option>
            </Form.Field>
            <FormRadio
              disabled={props.values.id ? false : true}
              id="bindingOffer"
              name="bindingOffer"
              label="Määräaika"
              checked={props.values.bindingOffer === true}
              onChange={props.handleChange}
            />
          </Form.Group>
          <FormInput
            label="Alennus"
            disabled={props.values.id ? false : true}
            name="oneTimeDiscount"
            type="number"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.oneTimeDiscount}
            touched={props.touched.oneTimeDiscount}
          />

          <Form.Field
            disabled={props.values.id ? false : true}
            name="offerValue"
            label="Tarjouksen arvo"
            control="select"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Field>
        </Form>
      )}
    </Formik>
  );
};

export default AddOfferForm;
