import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Header, Label } from 'semantic-ui-react';
import { FormInput, FormRadio } from '../../utils/FormHelpers';

const validationSchema = new Yup.object().shape({
  type: Yup.string().required('Tyyppi puuttuu'),
  name: Yup.string().required('Nimi puuttuu'),
  antiVirus: Yup.string().required('Antivirus ohjelmisto puuttuu'),
  antiVirusAmount: Yup.number().required(
    'Antivirus ohjelmiston lisenssimäärä puuttuu'
  ),
  VPN: Yup.boolean().required('VPN tieto puuttuu'),
  VPNAmount: Yup.number().required('VPN lisenssimäärä puuttuu'),
  cloud: Yup.string().required('Pilvipalvelu puuttuu'),
  cloudLimit: Yup.string().required('Pilvipalvelun määrä puuttuu'),
  office365: Yup.boolean().required('Office 365 tieto puuttuu'),
  support: Yup.boolean().required('Tukipalvelutieto puuttuu'),
  remoteFix: Yup.boolean().required('Remote-fix tieto puuttuu'),
  length: Yup.number().required('Sopimuksen pituus puuttuu'),
  price: Yup.number().required('Hinta puuttuu'),
});

const AddSAForm = ({ handleAddServiceAgreement }) => {

  return (
    <Formik
      initialValues={{
        type: '',
        name: '',
        antiVirus: 'McAfee Livesafe',
        antiVirusAmount: 50,
        VPN: true,
        VPNAmount: 5,
        cloud: 'Jotta cloud',
        cloudLimit: 'Rajaton',
        office365: false,
        support: true,
        remoteFix: true,
        length: undefined,
        price: undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        console.log(values);
        await handleAddServiceAgreement(values)
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit} id="addSAForm">
          <Header as="h2">Huolenpitopalvelu</Header>
          <Form.Group>
            <FormInput
              label="Tuotekoodi"
              name="type"
              type="text"
              placeholder="tuotekoodi"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.type}
              touched={props.touched.type}
            />
            <FormInput
              label="Nimi"
              name="name"
              type="text"
              placeholder="nimi"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.name}
              touched={props.touched.name}
            />
          </Form.Group>
          <Form.Group>
            <FormInput
              label="Tietoturva"
              name="antiVirus"
              type="text"
              placeholder={props.values.antiVirus}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.antiVirus}
              touched={props.touched.antiVirus}
            />
            <FormInput
              label="Tietoturva lisenssit"
              name="antiVirusAmount"
              type="number"
              placeholder={props.values.antiVirusAmount}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.antiVirusAmount}
              touched={props.touched.antiVirusAmount}
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
              name="VPNAmount"
              type="number"
              placeholder={props.values.VPNAmount}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.VPNAmount}
              touched={props.touched.VPNAmount}
            />
          </Form.Group>
          <Form.Group>
            <FormInput
              label="Pilvipalvelu"
              name="cloud"
              type="text"
              placeholder={props.values.cloud}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.cloud}
              touched={props.touched.cloud}
            />
            <FormInput
              label="Pilvipalvelu rajoitus"
              name="cloudLimit"
              type="text"
              placeholder={props.values.cloudLimit}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.cloudLimit}
              touched={props.touched.cloudLimit}
            />
          </Form.Group>
          <Form.Group>
            <FormRadio
              id="office365"
              name="office365"
              label="Office 365"
              checked={props.values.office365 === true}
              onChange={props.handleChange}
            />
            <FormRadio
              id="support"
              name="support"
              label="Support"
              checked={props.values.support === true}
              onChange={props.handleChange}
            />
                  <FormRadio
              id="remoteFix"
              name="remoteFix"
              label="Remote Fix"
              checked={props.values.remoteFix === true}
              onChange={props.handleChange}
            />
          </Form.Group>
          <Form.Group>
          <FormInput
              label="Pituus"
              name="length"
              type="number"              
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.length}
              touched={props.touched.length}
            />
             <FormInput
              label="Hinta"
              name="price"
              type="number"              
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.price}
              touched={props.touched.price}
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default AddSAForm;
