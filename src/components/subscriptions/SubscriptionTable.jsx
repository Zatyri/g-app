import React from 'react';
import { XorVIcon } from '../utils/FormHelpers';

const SubscriptionTable = ({ subRef }) => {
  const featureLine = (feature, value, suffix) => {
    let styles = {};
    switch (feature) {
      case 'Tarjous':
        styles = { fontSize: '2.5em' };
        break;
      case 'Norm. hinta':
        styles = { textDecoration: 'line-through', color: 'grey' };
        break;
      case 'Lahjakortti':
        styles = { fontSize: '2.5em' };
        break;
      default:
        break;
    }

    return (
      <div className="offerCardLine">
        <p>{feature}</p>
        <span></span>
        <p style={styles}>
          {value}
          <span className="small"> {suffix}</span>
        </p>
      </div>
    );
  };

  return (
    <div className="subscriptionDetailContainer">
      <div>
        {featureLine('Puhe', subRef.talk, subRef.talk !== 'Rajaton' && 'min')}
        {featureLine('Viestit', subRef.sms, subRef.sms !== 'Rajaton' && 'kpl')}
        {featureLine('Nettinopeus', subRef.speed, 'Mbit/s')}
        {featureLine('Rajaton netti', <XorVIcon value={subRef.unlimited} />)}
        {featureLine('EU data', subRef.eu, 'Gt/kk')}
      </div>
      <div>
        {featureLine('Tarjous', subRef.offer, '€/kk')}
        {featureLine('Norm. hinta', subRef.price, '€/kk')}
        {subRef.oneTimeDiscount ? featureLine('Lahjakortti', subRef.oneTimeDiscount, '€'): null}
        {featureLine('Kesto', subRef.offerLength, `kk${subRef.bindingOffer ? '*': ''}`)}
        {!subRef.bindingOffer && featureLine('Ei määräaikaa', <XorVIcon value={true} />)}
      </div>
    </div>
  );
};

export default SubscriptionTable;
