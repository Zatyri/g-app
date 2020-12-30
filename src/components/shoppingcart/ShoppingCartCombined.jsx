import React from 'react';

const ShoppingCartCombined = ({ shoppingCart }) => {
  const monthlyPayments = () => {
    let totalMontlyPayment = 0;
    shoppingCart.forEach((itemRef) => {
      totalMontlyPayment =
        parseFloat(totalMontlyPayment) +
        (itemRef.offer.__typename !== 'ServiceAgreement'
          ? parseFloat(itemRef.offer.offer) * itemRef.amount
          : (parseFloat(itemRef.offer.price) / itemRef.offer.length) *
            itemRef.amount);
    });
    return totalMontlyPayment.toFixed(2);
  };

  const combinedSavings = () => {
    let savings = 0;

    shoppingCart.forEach((itemRef) => {
      if(itemRef.current.monthlyPayment === false){
       
      }
      else if (itemRef.current) {
        let itemRefSavings = itemRef.current.offer
          ? parseFloat(itemRef.current.offer) - parseFloat(itemRef.offer.offer)
          : parseFloat(itemRef.current.price) -
            (itemRef.offer.__typename !== 'ServiceAgreement'
              ? parseFloat(itemRef.offer.offer)
              : parseFloat(itemRef.offer.price) / itemRef.offer.length);
        savings = savings + parseFloat(itemRefSavings) * itemRef.amount * 12;        
      } else {
        savings =
          savings -
          (itemRef.offer.__typename !== 'ServiceAgreement'
            ? parseFloat(itemRef.offer.offer) * itemRef.amount * 12
            : (parseFloat(itemRef.offer.price) / itemRef.offer.length) *
              itemRef.amount *
              12);
      }
    });
    return savings.toFixed(2);
  };

  const combinedDiscounts = () => {
    let discounts = 0;
    shoppingCart.forEach((itemRef) => {
      discounts = itemRef.offer.oneTimeDiscount
        ? discounts + itemRef.offer.oneTimeDiscount * itemRef.amount
        : discounts;
    });
    return discounts;
  };

  return (
    <div className="flexRow offerCardLine shoppingCartCombinedContainer">
      <div>Yhteenveto:</div>
      {combinedSavings() > 0 && (
        <div className="combinedItem">
          Säästöä yhteensä:{' '}
          <div>
            {combinedSavings()} <span className="small">€/vuosi</span>
          </div>
        </div>
      )}
      {combinedDiscounts() > 0 && (
        <div className="combinedItem">
          Lahjakortteja yhteensä:{' '}
          <div>
            {combinedDiscounts()} <span className="small">€</span>
          </div>
        </div>
      )}

      <div className="combinedItem">
        Kuukausimaksut:{' '}
        <div>
          {monthlyPayments()} <span className="small">€</span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartCombined;
