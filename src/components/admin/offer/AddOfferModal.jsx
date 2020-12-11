import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { Button, Modal } from 'semantic-ui-react';

import { ADD_OFFER, ADD_NET_OFFER } from '../../../queries/subscription';
import AddOfferForm from './AddOfferForm';

const AddOfferModal = () => {
  const [open, setOpen] = useState(false);
  const [addOffer] = useMutation(ADD_OFFER, {
    context: { scope: 'api://gappi/api/storeadmin' },
  });

  const [addNetOffer] = useMutation(ADD_NET_OFFER, {
    context: { scope: 'api://gappi/api/storeadmin' },
  });
  

  const handleAddOffer = async (values) => {
    try {
      const result = await addOffer({
        variables: { ...values },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              allSubscriptionsWithOffer: (existingFieldData) => {
                const newFieldData = [...existingFieldData, data.addOffer];
                return newFieldData;
              },
            },
          });
        },
      });

      setOpen(false);
      return result;
    } catch (error) {
      window.alert(error);
      setOpen(false);
    }
  };

  const handleAddNetOffer = async (values) => {
    try {
      const result = await addNetOffer({
        variables: { ...values },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              allNetSubscriptionsWithOffer: (existingFieldData) => {
                const newFieldData = [...existingFieldData, data.addNetOffer];
                return newFieldData;
              },
            },
          });
        },
      });

      setOpen(false);
      return result;
    } catch (error) {
      window.alert(error);
      setOpen(false);
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button positive >Lisää tarjous</Button>}
    >
      <Modal.Header>Lisää tarjous</Modal.Header>
      <Modal.Content>
        <AddOfferForm handleAddOffer={handleAddOffer} handleAddNetOffer={handleAddNetOffer}/>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Peruuta"
          icon="x"
          labelPosition="right"
          color="black"
          onClick={() => setOpen(false)}
        />

        <Button
          type="submit"
          form="addOfferForm"
          content="Tallenna"
          labelPosition="right"
          icon="checkmark"
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddOfferModal;
