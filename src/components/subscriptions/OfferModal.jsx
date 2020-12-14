import React, { useState } from 'react';

import { Button, Modal } from 'semantic-ui-react';

import { OperatorLogo } from '../utils/OperatorLogo';
import CompareOffer from './CompareOffer';
import CompareNetOffer from '../netsubscriptions/CompareNetOffer'
import OfferCard from './OfferCard';
import SubscriptionTable from './SubscriptionTable';

const OfferModal = ({ subRef, handleShoppingCart }) => {
  const [open, setOpen] = useState(false);
  const [comparison, setComparison] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
            <div className={'flexRow'}>
              <div className="offerModalHeader">
                <OperatorLogo operator={subRef.operator.name} />{' '}
                <span style={{ paddingLeft: '2em' }}>{subRef.name}</span>
              </div>
              <Button
                className="closeButton"
                onClick={() => setOpen(false)}
                icon="x"
              />
            </div>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <SubscriptionTable subRef={subRef} />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Vertailu"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setComparison(true)}
              positive
            />
          </Modal.Actions>
        </>
      ) : (
        !subRef.type ? <CompareOffer offerSub={subRef} handleClose={handleClose} handleShoppingCart={handleShoppingCart} /> : <CompareNetOffer  offerSub={subRef} handleClose={handleClose} handleShoppingCart={handleShoppingCart}/>
      )}
    </Modal>
  );
};

export default OfferModal;
