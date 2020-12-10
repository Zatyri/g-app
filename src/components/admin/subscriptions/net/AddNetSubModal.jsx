import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { Modal, Button, Icon } from 'semantic-ui-react';
import AddNetSubForm from './AddNetSubForm';

import { ADD_NET_SUBSCRIPTION } from '../../../../queries/subscription';
// import AddSubscriptionForm from './AddSubscriptionForm';

const AddNetSubModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState();
  const [addNetSubscription] = useMutation(ADD_NET_SUBSCRIPTION, {
    context: { scope: 'api://gappi/api/admin' },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSubscription = async ({
    operator,
    name,
    type,
    speed,
    eu,
    active,
    price,
  }) => {
    try {
      await addNetSubscription({
        variables: {
          operator,
          name,
          type,
          speed,
          eu,
          active,
          price,
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              allNetSubscriptions: (existingFieldData) => {
                const newFieldData = [
                  ...existingFieldData,
                  data.addNetSubscription,
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
      trigger={
        <Button icon labelPosition="right">
          <Icon name="download" />
          Lisää nettiliittymä
        </Button>
      }
    >
      <Modal.Header>Lisää nettiliittymä</Modal.Header>
      <Modal.Content>
        {
          <AddNetSubForm
            closeModal={handleClose}
            selectedOperator={selectedOperator}
            setSelectedOperator={setSelectedOperator}
            handleAddSubscription={handleAddSubscription}
          />
        }
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Peruuta
        </Button>
        <Button onClick={() => setSelectedOperator()}>
          Vaihda operaattoria
        </Button>
        <Button
          type="submit"
          form="addNetSubscription"
          content="Lisää"
          labelPosition="right"
          icon="checkmark"
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddNetSubModal;
