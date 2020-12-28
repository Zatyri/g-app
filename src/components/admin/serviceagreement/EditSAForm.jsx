import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { Form, Header } from 'semantic-ui-react';

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

const EditSAForm = ({handleUpdateSA, SARef}) => {
  return (
    <Formik
      initialValues={{
        type: SARef.type,
        name: SARef.name,
        antiVirus: SARef.antiVirus,
        antiVirusAmount: SARef.antiVirusAmount,
        VPN: SARef.VPN,
        VPNAmount: SARef.VPNAmount,
        cloud: SARef.cloud,
        cloudLimit: SARef.cloudLimit,
        office365: SARef.office365,
        support: SARef.support,
        remoteFix: SARef.remoteFix,
        length: SARef.length,
        price: SARef.price,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {      
        await handleUpdateSA({...values, id: SARef.id})
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit} id="editSAForm">
          <Header as="h2">Huolenpitopalvelu</Header>
          <Form.Group>
            <FormInput
              label="Tuotekoodi"
              name="type"
              type="text"
              value={props.values.type}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.type}
              touched={props.touched.type}
            />
            <FormInput
              label="Nimi"
              name="name"
              type="text"
              value={props.values.name}
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
              value={props.values.antiVirus}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.antiVirus}
              touched={props.touched.antiVirus}
            />
            <FormInput
              label="Tietoturva lisenssit"
              name="antiVirusAmount"
              type="number"
              value={props.values.antiVirusAmount}
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
              value={props.values.VPNAmount}
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
              value={props.values.cloud}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.cloud}
              touched={props.touched.cloud}
            />
            <FormInput
              label="Pilvipalvelu rajoitus"
              name="cloudLimit"
              type="text"
              value={props.values.cloudLimit}
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
              value={props.values.length}           
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.length}
              touched={props.touched.length}
            />
             <FormInput
              label="Hinta"
              name="price"
              type="number"       
              value={props.values.price}       
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.errors.price}
              touched={props.touched.price}
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  )
}

export default EditSAForm
