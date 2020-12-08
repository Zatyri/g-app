import React from 'react';

import { Card, Divider } from 'semantic-ui-react';
import { XorVIcon } from '../utils/FormHelpers';

import { OperatorLogo } from '../utils/OperatorLogo';

const OfferCard = ({sub, ...rest}) => { 
  
  return (
    <div {...rest}>
    <Card raised className='offerCard' >
      <div className="offerCardLogo">
        <OperatorLogo operator={sub.operator.name} size="medium" />
      </div>
      <Card.Content>
        <Card.Header>{sub.name}</Card.Header>
        <Divider />
        <Card.Description>
          <div className="offerCardLine">
            <p>Tarjous:</p>
            <span></span>
            <p>{sub.offer}<span className='small'>€/kk</span></p>
          </div>
          {sub.oneTimeDiscount !== 0 && (
            <div className="offerCardLine">
              <p>Lahjakortti:</p>
              <span></span>
              <p>{sub.oneTimeDiscount}<span className='small'>€</span></p>
            </div>
          )}
          <div className="offerCardLine">
            <p>Pituus:</p>
            <span></span>
            <p>
              {sub.offerLength}<span className='small'>kk{sub.bindingOffer && '*'}</span>
            </p>
          </div>
          {!sub.bindingOffer && <div className="offerCardLine">
              <p>Ei määräaikaa:</p>
              <span></span>
              <XorVIcon value={true} />
            </div>}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      {sub.bindingOffer && <p>* määräaikainen sopimus</p>}
    </Card.Content>
    </Card>
    </div>
  );
};

export default OfferCard;
