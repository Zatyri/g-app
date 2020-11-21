import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { OperatorLogo } from '../utils/OperatorLogo';
import OfferCard from './OfferCard';
import SubscriptionTable from './SubscriptionTable';

const OfferModal = ({ subRef }) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<OfferCard sub={subRef}></OfferCard>}
    >
      <Modal.Header>
        <div className="offerModalHeader">
          <OperatorLogo operator={subRef.operator.name} />{' '}
          <span style={{paddingLeft:'2em'}}>{subRef.name}</span>          
        </div>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <SubscriptionTable subRef={subRef} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default OfferModal;
