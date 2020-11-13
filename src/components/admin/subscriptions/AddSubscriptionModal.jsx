import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import AddSubscriptionForm from './AddSubscriptionForm';

const AddSubscriptionModal = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
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
        <AddSubscriptionForm closeModal={handleClose} />
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)} >
          Peruuta
        </Button>
        <Button
              type='submit'
              form='addSubscription'
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
