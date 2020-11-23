import React, { useState } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

const ShoppingCart = ({ shoppingCart, handleShoppingCart }) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button className="shoppingCartButton" color="green" icon="shop" />
      }
    >
      <Modal.Header>
        <div className="flexRow">
          <Header as="h2">Ostoskori</Header>
          <Button
            className="closeButton"
            onClick={() => setOpen(false)}
            icon="x"
          />
        </div>
      </Modal.Header>
      <Modal.Content>sisältö</Modal.Content>
      <Modal.Actions>      
        <Button
          content="Tyhjennä"
          labelPosition="right"  
          icon='trash'   
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ShoppingCart;
