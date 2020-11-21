import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { OperatorLogo } from '../utils/OperatorLogo';
import CompareOffer from './CompareOffer';
import OfferCard from './OfferCard';
import SubscriptionTable from './SubscriptionTable';

const OfferModal = ({ subRef }) => {
  const [open, setOpen] = useState(false);
  const [comparison, setComparison] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true);
        setComparison(false);
      }}
      open={open}
      trigger={<OfferCard sub={subRef}></OfferCard>}
    >
      {!comparison ? (
        <>
          <Modal.Header>
            <div className="offerModalHeader">
              <OperatorLogo operator={subRef.operator.name} />{' '}
              <span style={{ paddingLeft: '2em' }}>{subRef.name}</span>
            </div>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <SubscriptionTable subRef={subRef} />
            </Modal.Description>
          </Modal.Content>
        </>
      ) : <CompareOffer offerSub={subRef} />}
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Sulje
        </Button>
        {!comparison ? <Button
          content="Vertailu"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setComparison(true)}
          positive
        />: <Button
        type='submit'
        form='currentSubscriptionForm'
        content="Vertailuun"
        labelPosition="right"
        icon="checkmark"
        
        positive
      />}
      </Modal.Actions>
    </Modal>
  );
};

export default OfferModal;
