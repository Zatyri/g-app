import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { Button, Icon, Modal } from 'semantic-ui-react';


import { EDIT_NET_SUBSCRIPTION } from '../../../../queries/subscription';
import EditNetSubForm from './EditNetSubForm';

const EditNetSubModal = (props) => {
  const [open, setOpen] = useState(false);
  const [editSubscription] = useMutation(EDIT_NET_SUBSCRIPTION, {
    context: { scope: 'api://gappi/api/admin' },
  });

  const handleUpdateSub = async ({
    id,
    name,
    type,
    speed, 
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
          type,
          speed,
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
      <Modal.Header>Muokkaa</Modal.Header>
      <Modal.Content>
        <EditNetSubForm subRef={props.subRef} handleEditSub={handleUpdateSub} />
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="submit"
          form="editNetSubscriptionForm"
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

export default EditNetSubModal;

