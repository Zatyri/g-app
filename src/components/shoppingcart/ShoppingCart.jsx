import React, { useState } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';

import ShoppingCartCombined from './ShoppingCartCombined';
import ShoppingItemRow from './ShoppingItemRow';

const ShoppingCart = ({ shoppingCart, setShoppingCart }) => {
  const [open, setOpen] = useState(false);

  const editItemAmount = (action, itemID) => {
    const itemIndex = shoppingCart.findIndex(
      (itemRef) => itemID === itemRef.id
    );
    const newItem = shoppingCart[itemIndex];
    const newShoppingCart = shoppingCart.filter(
      (itemRef) => itemID !== itemRef.id
    );

    switch (action) {
      case 'ADD':
        newItem.amount++;
        setShoppingCart([...newShoppingCart, newItem]);
        break;
      case 'SUBTRACT':
        if (shoppingCart[itemIndex].amount <= 1) {
          return null;
        }
        newItem.amount--;
        setShoppingCart([...newShoppingCart, newItem]);
        break;
      case 'DELETE':
        setShoppingCart([...newShoppingCart]);
        break;
      case 'DELETE_ALL':
        setShoppingCart([]);
        setOpen(false);
        break;
      default:
        console.log('invalid action in editItemAmount');
        break;
    }
  };

  const sortItems = (a, b) => {
    if (a.offer.name < b.offer.name) {
      return 1;
    } else if (a.offer.name > b.offer.name) {
      return -1;
    } else {
      return 0;
    }
  };

  return (
    <Modal
      className="shoppingCartModal"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <div className="shoppingCartButtonContainer">
          <Button className="shoppingCartButton" color="green" icon="shop" />
          {shoppingCart.length > 0 ? <span>{shoppingCart.length}</span> : null}
        </div>
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
      <Modal.Content>
        {shoppingCart.sort(sortItems).map((itemRef) => (
          <ShoppingItemRow
            key={itemRef.id}
            item={itemRef}
            editItemAmount={editItemAmount}
          />
        ))}
        <ShoppingCartCombined shoppingCart={shoppingCart} />
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Tyhjennä"
          labelPosition="right"
          icon="trash"
          onClick={() => editItemAmount('DELETE_ALL')}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ShoppingCart;
