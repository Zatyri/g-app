import React from 'react';
import { Card } from 'semantic-ui-react';
import { XorVIcon } from '../utils/FormHelpers';

const SACard = ({ SARef, ...rest }) => {
  return (
    <div {...rest}>
      <Card raised className="offerCard">
        <Card.Content>
          <Card.Header>{SARef.name}</Card.Header>
          <Card.Meta>{SARef.type}</Card.Meta>
          <Card.Description>
            <div className="offerCardLine">
              <p>Tietoturva:</p>
              <span></span>
              <p>{SARef.antiVirus}</p>
            </div>
            <div className="offerCardLine">
              <p>VPN:</p>
              <span></span>
              <XorVIcon value={SARef.VPN} />
            </div>
            <div className="offerCardLine">
              <p>Pilvipalvelu:</p>
              <span></span>
              <XorVIcon value={SARef.cloud ? true : false} />
            </div>
            <div className="offerCardLine">
              <p>Office 365 Family:</p>
              <span></span>
              <XorVIcon value={SARef.office365} />
            </div>
            <div className="offerCardLine">
              <p>Puhelintuki:</p>
              <span></span>
              <XorVIcon value={SARef.support} />
            </div>
            <div className="offerCardLine">
              <p>Remote Fix:</p>
              <span></span>
              <XorVIcon value={SARef.remoteFix} />
            </div>
            <div className="offerCardLine">
              <p>Sopimus:</p>
              <span></span>
              <p>
                {SARef.length}
                <span className="small">kk</span>
              </p>
            </div>
            <div className="offerCardLine">
              <p>Hinta:</p>
              <span></span>
              <p>
                {SARef.price}
                <span className="small">€</span>
              </p>
            </div>
            <div className="offerCardLine">
              <p>Kuukausimaksu:</p>
              <span></span>
              <p>
                {(SARef.price / SARef.length).toFixed(2)}
                <span className="small">€/kk</span>
              </p>
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SACard;
