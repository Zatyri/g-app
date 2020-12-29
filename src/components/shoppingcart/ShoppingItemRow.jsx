import React from 'react';
import { Button } from 'semantic-ui-react';
import CompareOfferTable from '../subscriptions/CompareOfferTable';

import { AddRemoveInput } from '../utils/FormHelpers';
import { OperatorLogo } from '../utils/OperatorLogo';

const ShoppingItemRow = ({ item, editItemAmount }) => {
  const editItem = (action) => {
    editItemAmount(action, item.id);
  };
  

  const priceDifference = () => {
    if(item.current) {
      const current = parseInt(
        item.current.offer ? item.current.offer : item.current.price
      );
      const offer = parseInt(item.offer.offer);

      return (current - offer) * item.amount * 12;
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="flexRow offerCardLine shoppingCart">
        <AddRemoveInput amount={item.amount} action={editItem} />

        <OperatorLogo operator={item.offer.operator.name} />
        <div className="shoppingCartName">
          <div>{item.offer.name}</div>
          {item.current && (
            <CompareOfferTable
              currentSub={item.current}
              offerSub={item.offer}
              currentSubOffer={item.current.offer}
              shoppingCart={true}
            />
          )}
        </div>
        <span />

        <div className="cheaperPrice">
          {item.amount > 1 ? (
            <div className="flexRow">
              <div>
                {(item.offer.offer * item.amount).toFixed(2)}
                <span className="small">€/kk</span>
              </div>
              <div className="slash">/</div>
              <div>
                <span className="small">({item.offer.offer} €/kk)</span>
              </div>
            </div>
          ) : (
            <div>
              {item.offer.offer} <span className="small"> €/kk</span>
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
  );
};

export default ShoppingItemRow;
