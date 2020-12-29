import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, Form, Modal } from 'semantic-ui-react';
import { OperatorLogo } from '../utils/OperatorLogo';
import { FormInput, FormRadio } from '../utils/FormHelpers';

const validationSchema = new Yup.object().shape({
  antiVirus: Yup.boolean().required(''),
  antiVirusAmount: Yup.number().when('antiVirus', {
    is: true,
    then: Yup.number().required('Anna lisenssimäärä'),
    otherwise: Yup.number().notRequired(),
  }),
  VPN: Yup.boolean().required(''),
  VPNAmount: Yup.number().when('VPN', {
    is: true,
    then: Yup.number().required('Anna lisenssimäärä'),
    otherwise: Yup.number().notRequired(),
  }),
  monthlyPayment: Yup.boolean().required(''),
  price: Yup.number().required('Hinta puuttuu'),
});

const SelectCurrentSA = ({ operators, handleSelect, handleClose }) => {
  const [selectedOperator, setSelectedOperator] = useState();
  return (
    <>
      <Modal.Header>
        <div className="flexRow">
          <div className="offerModalHeader">Valitse nykyinen tietoturva</div>
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
            antiVirus: true,
            antiVirusAmount: undefined,
            VPN: false,
            VPNAmount: undefined,
            monthlyPayment: true,
            price: undefined,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if(selectedOperator){
            handleSelect({...values, operator: selectedOperator});
            } else {
              window.alert('Valitse operaattori')
            }
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} id="currentSAForm">
              <Form.Group>
                <FormRadio
                  id="antiVirus"
                  name="antiVirus"
                  label="Tietoturva"
                  checked={props.values.antiVirus === true}
                  onChange={props.handleChange}
                />
                <FormInput
                  label="Tietoturva lisenssit"
                  placeholder="Tietoturva lisenssit"
                  type="number"
                  name="antiVirusAmount"
                  disabled={!props.values.antiVirus}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  error={props.errors.antiVirusAmount}
                  touched={props.touched.antiVirusAmount}
                  wholeNumbers={true}
                />
              </Form.Group>
              <Form.Group>
                <FormRadio
                  id="VPN"
                  name="VPN"
                  label="VPN"
                  checked={props.values.VPN === true}
                  onChange={props.handleChange}
                />
                <FormInput
                  label="VPN lisenssit"
                  placeholder="VPN lisenssit"
                  type="number"
                  name="VPNAmount"
                  disabled={!props.values.VPN}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  error={props.errors.VPNAmount}
                  touched={props.touched.VPNAmount}
                  wholeNumbers={true}
                />
              </Form.Group>
              <Form.Group>
                <FormRadio
                  id="monthlyPayment"
                  name="monthlyPayment"
                  label="Kuukausimaksullinen"
                  checked={props.values.monthlyPayment === true}
                  onChange={props.handleChange}
                />
                <FormInput
                  label="Hinta"
                  placeholder="Hinta"
                  type="number"
                  name="price"                  
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  error={props.errors.price}
                  touched={props.touched.price}
                />
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="submit"
          form="currentSAForm"
          content="Vertailuun"
          labelPosition="right"
          icon="checkmark"
          positive
        />
      </Modal.Actions>
    </>
  );
};

export default SelectCurrentSA;
