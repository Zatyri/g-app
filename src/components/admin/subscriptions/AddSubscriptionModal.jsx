import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { ADD_SUBSCRIPTION } from '../../../queries/subscription';
import AddSubscriptionForm from './AddSubscriptionForm';

const AddSubscriptionModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState();
  const [addSubscription] = useMutation(ADD_SUBSCRIPTION);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSubscription = async ({
    operator,
    name,
    talk,
    sms,
    speed,
    unlimited,
    eu,
    active,
    price,
  }) => {
    try {
      await addSubscription({
        variables: {
          operator,
          name,
          talk,
          sms,
          speed,
          unlimited,
          eu,
          active,
          price,
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              allSubscriptions: (existingFieldData) => {
                const newFieldData = [
                  ...existingFieldData,
                  data.addSubscription,
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
      trigger={<Button>Lisää liittymä</Button>}
    >
      <Modal.Header>Lisää liittymä</Modal.Header>
      <Modal.Content>
        <AddSubscriptionForm
          closeModal={handleClose}
          selectedOperator={selectedOperator}
          setSelectedOperator={setSelectedOperator}
          handleAddSubscription={handleAddSubscription}
        />
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
          form="addSubscription"
          content="Lisää"
          labelPosition="right"
          icon="checkmark"
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddSubscriptionModal;
