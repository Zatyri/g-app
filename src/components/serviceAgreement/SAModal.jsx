import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import SATable from './SATable';
import { XorVIcon } from '../utils/FormHelpers';
import SACard from './SACard';

const SAModal = ({ SARef, handleShoppingCart }) => {
  const [open, setOpen] = useState(false);
  const [comparison, setComparison] = useState(false);

  const handleAddToShoppingCart = () => {

  }

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
      <Modal.Header>{SARef.name}</Modal.Header>
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
            content='Lisää koriin'
            labelPosition='right'
            icon='plus'
            onClick={handleAddToShoppingCart}            
            />
          </Modal.Actions>
    </Modal>
  );
};

export default SAModal;
