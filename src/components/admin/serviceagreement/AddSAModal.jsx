import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { Modal, Button, Icon } from 'semantic-ui-react';
import { ADD_SERVICE_AGREEMENT } from '../../../queries/serviceAgreement';
import AddSAForm from './AddSAForm';


const AddSAModal = () => {
  const [open, setOpen] = useState(false); 
  const [addServiceAgreement] = useMutation(ADD_SERVICE_AGREEMENT, {
    context: { scope: 'api://gappi/api/admin' },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddServiceAgreement = async ({
    type,
    name,
    antiVirus,
    antiVirusAmount,
    VPN,
    VPNAmount,
    cloud,
    cloudLimit,
    office365,
    support,
    remoteFix,
    length,
    price
  }) => {
    try {
      await addServiceAgreement({
        variables: {
          type,
          name,
          antiVirus,
          antiVirusAmount,
          VPN,
          VPNAmount,
          cloud,
          cloudLimit,
          office365,
          support,
          remoteFix,
          length,
          price: price.toString()
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              allServiceAgreements: (existingFieldData) => {
                const newFieldData = [
                  ...existingFieldData,
                  data.addServiceAgreement,
                ];
                return newFieldData;
              },
            },
          });
        },
      });
      setOpen(false);
    } catch (error) {
      window.alert(error.message);
      setOpen(false);
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon labelPosition='right'><Icon name='file' />Lisää huolenpitosopimus</Button>}
    >
      <Modal.Header>Lisää huolenpitosopimus</Modal.Header>
      <Modal.Content>
        <AddSAForm
          closeModal={handleClose}    
          handleAddServiceAgreement={handleAddServiceAgreement}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Peruuta
        </Button>   
        <Button
          type="submit"
          form="addSAForm"
          content="Lisää"
          labelPosition="right"
          icon="checkmark"
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddSAModal;
