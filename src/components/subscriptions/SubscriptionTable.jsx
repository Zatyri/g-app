import React from 'react';

import { XorVIcon } from '../utils/FormHelpers';
import OfferCardRow from './OfferCardRow';

const SubscriptionTable = ({ subRef }) => {
  console.log(subRef);
  return (
    <div className="subscriptionDetailContainer">
      <div>
        {subRef.type && (
          <OfferCardRow feature="Tekniikka" value={subRef.type} />
        )}
        {!subRef.type && (
          <OfferCardRow
            feature="Puhe"
            value={subRef.talk}
            suffix={subRef.talk !== 'Rajaton' && 'min'}
          />
        )}
        {!subRef.type && (
          <OfferCardRow
            feature="Viestit"
            value={subRef.sms}
            suffix={subRef.sms !== 'Rajaton' && 'kpl'}
          />
        )}
        <OfferCardRow
          feature="Nettinopeus"
          value={subRef.speed}
          suffix="Mbit/s"
        />
        {!subRef.type && (
          <OfferCardRow
            feature="Rajaton netti"
            value={<XorVIcon value={subRef.unlimited} />}
          />
        )}
        { !(subRef.type === "VDSL" || subRef.type === "ADSL" || subRef.type === "kaapeli" || subRef.type === "valokuitu") &&
        <OfferCardRow feature="EU data" value={subRef.eu} suffix="Gt/kk" />
        } 
      </div>
      <div>
        <OfferCardRow feature="Tarjous" value={subRef.offer} suffix="€/kk" />
        <OfferCardRow
          feature="Norm. hinta"
          value={subRef.price}
          suffix="€/kk"
        />
        {subRef.oneTimeDiscount ? (
          <OfferCardRow
            feature="Lahjakortti"
            value={subRef.oneTimeDiscount}
            suffix="€"
          />
        ) : null}
        <OfferCardRow
          feature="Pituus"
          value={subRef.offerLength}
          suffix={`kk${subRef.bindingOffer ? '*' : ''}`}
        />
        {!subRef.bindingOffer && (
          <OfferCardRow
            feature="Ei määräaikaa"
            value={<XorVIcon value={true} />}
          />
        )}
      </div>
    </div>
  );
};

export default SubscriptionTable;
