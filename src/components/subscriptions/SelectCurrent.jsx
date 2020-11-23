import React, { useState } from 'react';
import { Button, Form, Label, Modal } from 'semantic-ui-react';
import { FormInput, FormRadio } from '../utils/FormHelpers';
import { OperatorLogo } from '../utils/OperatorLogo';
import * as Yup from 'yup';
import { Formik } from 'formik';

const validationSchema = new Yup.object().shape({
  subscription: Yup.string().required('Liittymätyyppiä ei valittu'),
  validOffer: Yup.boolean(),
  currentOffer: Yup.number().when('validOffer', {
    is: true,
    then: Yup.number().required('Tarjoushinta puuttuu'),
    otherwise: Yup.number().notRequired(),
  }),
});

const SelectCurrent = ({
  operators,
  subscriptions,
  handleSelect,
  handleClose,
}) => {
  const [selectedOperator, setSelectedOperator] = useState();

  return (
    <>
      <Modal.Header>
        <div className='flexRow'>
          <div className="offerModalHeader">Valitse nykyinen liittymä</div>
          <Button className="closeButton" onClick={handleClose} icon="x" />
        </div>
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            {operators.map((opRef) => (
              <Button
                key={opRef.id}
                onClick={() => setSelectedOperator(opRef.name)}
                className={`selectedOperatorButton 
                  ${
                    selectedOperator === opRef.name
                      ? 'selectedOperatorButtonActive'
                      : ''
                  }
                `}
              >
                <OperatorLogo operator={opRef.name} />
              </Button>
            ))}
          </Form.Field>
        </Form>
        <Formik
          initialValues={{
            subscription: undefined,
            validOffer: true,
            currentOffer: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSelect(values.subscription, values.currentOffer);
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} id="currentSubscriptionForm">
              <Form.Field>
                <Form.Field
                  label="Valitse liittymätyyppi"
                  name="subscription"
                  control="select"
                  disabled={!selectedOperator}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                >
                  <option></option>
                  {subscriptions
                    .filter(
                      (subRef) => subRef.operator.name === selectedOperator
                    )
                    .map((subRef) => (
                      <option key={subRef.id} value={subRef.id}>
                        {subRef.name}
                      </option>
                    ))}
                </Form.Field>
                {props.errors.subscription && (
                  <Label pointing color="yellow">
                    {props.errors.subscription}
                  </Label>
                )}
              </Form.Field>
              <FormRadio
                id="validOffer"
                name="validOffer"
                label="Onko tarjous voimassa?"
                checked={props.values.validOffer === true}
                onChange={props.handleChange}
                disabled={!props.values.subscription}
              />

              <FormInput
                label="Nykyinen tarjoushinta"
                placeholder="Nykyinen tarjoushinta"
                type="number"
                name="currentOffer"
                disabled={!props.values.validOffer}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={props.errors.currentOffer}
                touched={props.touched.currentOffer}
              />
            </Form>
          )}
        </Formik>
      </Modal.Content>
      <Modal.Actions>
      <Button
            type="submit"
            form="currentSubscriptionForm"
            content="Vertailuun"
            labelPosition="right"
            icon="checkmark"
            positive
          />
      </Modal.Actions>
    </>
  );
};

export default SelectCurrent;
