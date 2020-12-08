import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import EditSubscriptionForm from './EditSubscriptionForm';
import { EDIT_SUBSCRIPTION } from '../../../queries/subscription';

const EditSubscriptionModal = (props) => {
  const [open, setOpen] = useState(false);
  const [editSubscription] = useMutation(EDIT_SUBSCRIPTION, {
    context: { scope: 'api://gappi/api/admin' },
  });

  const handleUpdateSub = async ({
    id,
    name,
    talk,
    sms,
    speed,
    unlimited,
    eu,
    active,
    price
  }
  ) => {
    
    try {
      await editSubscription({
        variables: {
          id,
          name,
          talk,
          sms,
          speed,
          unlimited,
          eu,
          active,
          price,
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
        <Button id={props.subRef.id} onClick={props.handleClick}>
          <Icon name="configure" />
        </Button>
      }
    >
      <Modal.Header>Muokkaa käyttäjää</Modal.Header>
      <Modal.Content>
        <EditSubscriptionForm
          subRef={props.subRef}
          handleEditSub={handleUpdateSub}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="submit"
          form="editSubscriptionForm"
          content="Tallenna"
          icon="checkmark"
          positive
        />
        <Button
          content="Peruuta"
          icon="delete"
          onClick={() => setOpen(false)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EditSubscriptionModal;
