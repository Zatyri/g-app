import React from 'react'
import { Button } from 'semantic-ui-react';
import { AddRemoveInput } from '../utils/FormHelpers'

const ShoppingItemRowSA = ({item, editItemAmount}) => {
  const editItem = (action) => {
    editItemAmount(action, item.id);
  };

  const priceDifference = () => {
    if(item.current) {
      const current = parseInt( item.current.price);
      const offer = parseInt(item.offer.price);

      return (current - offer) * item.amount * 12;
    } else {
      return null;
    }
  };

  const monthlyFee = () => {
    return (item.offer.price / item.offer.length).toFixed(2)
  }

  return (
    <>
    <div className="flexRow offerCardLine shoppingCart">
      <AddRemoveInput amount={item.amount} action={editItem} />
      
      <div className="shoppingCartName">
        <div>{item.offer.name}</div>
        {
        /*item.current && (
          <CompareOfferTable
            currentSub={item.current}
            offerSub={item.offer}
            currentSubOffer={item.current.offer}
            shoppingCart={true}
          />
        )
        */}
      </div>
      <span />

      <div className="cheaperPrice">
        {item.amount > 1 ? (
          <div className="flexRow">
            <div>
              {(monthlyFee() * item.amount).toFixed(2)}
              <span className="small">€/kk</span>
            </div>
            <div className="slash">/</div>
            <div>
              <span className="small">({monthlyFee()} €/kk)</span>
            </div>
          </div>
        ) : (
          <div>
            {monthlyFee()} <span className="small"> €/kk</span>
          </div>
        )}
        {priceDifference() > 0 ? (
          <div className="dropdownCheaperPrice">
            säästät {priceDifference()} € /vuosi
          </div>
        ) : null}
      </div>
      <span />
      {item.offer.oneTimeDiscount ? (
        <>
          {' '}
          <div>
            {item.offer.oneTimeDiscount * item.amount}
            <span className="small"> € lahjakortti</span>
          </div>{' '}
        </>
      ) : null}

      <Button icon="trash" onClick={() => editItem('DELETE')} />
    </div>
  </>
  )
}

export default ShoppingItemRowSA
