import React from 'react';
import OfferCardRow from '../subscriptions/OfferCardRow';
import { XorVIcon } from '../utils/FormHelpers';

const SATable = ({ SARef }) => {
  return (
    <>
      <div className="subscriptionDetailContainer">
        <div>
          <OfferCardRow feature="Tietoturva:" value={SARef.antiVirus} />
          <OfferCardRow feature="VPN:" value={<XorVIcon value={SARef.VPN} />} />
          <OfferCardRow feature="Pilvipalvelu:" value={SARef.cloud} />
          <OfferCardRow
            feature="Puhelintuki:"
            value={<XorVIcon value={SARef.support} />}
          />
          {SARef.office365 && (
            <OfferCardRow
              feature="Office 365 Family:"
              value={<XorVIcon value={SARef.office365} />}
            />
          )}
          <OfferCardRow
            feature="Kokonaishinta:"
            value={SARef.price}
            suffix="€"
          />
        </div>
        <div>
          <OfferCardRow
            feature="Tietoturva lisenssit:"
            value={SARef.antiVirusAmount}
            suffix="kpl"
          />
          <OfferCardRow
            feature="VPN lisenssit:"
            value={SARef.VPNAmount}
            suffix="kpl"
          />
          <OfferCardRow
            feature="Pilvipalvelu rajoitus:"
            value={SARef.cloudLimit}
          />
          <OfferCardRow
            feature="Remote Fix:"
            value={<XorVIcon value={SARef.remoteFix} />}
          />
          {SARef.office365 && (
            <OfferCardRow
              feature="Office 365 lisenssit:"
              value={5}
              suffix="kpl"
            />
          )}
             <OfferCardRow
              feature="Sopimuskausi"
              value={SARef.length}
              suffix="kk"
            />
        </div>
      </div>
      <div className="subscriptionDetailContainer">
        <OfferCardRow
          feature="Kuukausihinta:"
          value={(SARef.price / SARef.length).toFixed(2)}
          suffix="€"
        />
      </div>
    </>
  );
};

export default SATable;
