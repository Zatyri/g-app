import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import SATable from './SATable';
import SACard from './SACard';
import CompareSA from './CompareSA';

const SAModal = ({ SARef, handleShoppingCart }) => {
  const [open, setOpen] = useState(false);
  const [comparison, setComparison] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToShoppingCart = () => {
    const newCartObject = {
      id: SARef.id,
      offer: SARef,
      current: null,
      amount: 1,
    };
    handleShoppingCart('ADD', newCartObject);
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
      trigger={<SACard SARef={SARef}></SACard>}
    >
      {!comparison ? (
        <>
          <Modal.Header>
            <div className="flexRow">
              <div className="offerModalHeader">{SARef.name}</div>
              <Button
                className="closeButton"
                onClick={() => setOpen(false)}
                icon="x"
              />
            </div>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <SATable SARef={SARef} />
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
            <Button
              content="Lisää koriin"
              labelPosition="right"
              icon="plus"
              onClick={handleAddToShoppingCart}
            />
          </Modal.Actions>
        </>
      ) : (
        <CompareSA
          offer={SARef}
          handleClose={handleClose}
          handleShoppingCart={handleShoppingCart}
        />
      )}
    </Modal>
  );
};

export default SAModal;
