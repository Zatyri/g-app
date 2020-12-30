import React from 'react';
import { Header } from 'semantic-ui-react';
import CompareSubRow from '../subscriptions/CompareSubRow';
import { XorVIcon } from '../utils/FormHelpers';
import { OperatorLogo } from '../utils/OperatorLogo';

const CompareSATable = ({ offerSA, currentSA, shoppingCart }) => {
  
  return (
    <>
      <div
        className={`compereRowContainer ${
          shoppingCart && 'shoppingCartOfferTable'
        }`}
      >
        <div className="compareHeader">
          <div className="flexColumn">
            <OperatorLogo operator={currentSA.operator} />
            <Header as="h3">Nykyinen tietoturvapaketti</Header>
          </div>
          <span />
          <div className="flexColumn">
            <Header as="h3">{offerSA.name}</Header>
          </div>
        </div>
        <CompareSubRow
          feature="Tietoturva"
          current={<XorVIcon value={currentSA.antiVirus} />}
          compareTo={<XorVIcon value={offerSA.antiVirus ? true : false} />}
          offerBetter={currentSA.antiVirus ? false : true}
        />
        <CompareSubRow
          feature="Tietoturva lisenssit"
          suffix="kpl"
          current={currentSA.antiVirusAmount}
          compareTo={offerSA.antiVirusAmount}
        />
        <CompareSubRow
          feature="VPN"
          current={<XorVIcon value={currentSA.VPN} />}
          compareTo={<XorVIcon value={offerSA.VPN} />}
          offerBetter={currentSA.VPN ? false : true}
        />
        <CompareSubRow
          feature="VPN lisenssit"
          suffix="kpl"
          current={
            currentSA.VPNAmount ? (
              currentSA.VPNAmount
            ) : (
              <XorVIcon value={false} />
            )
          }
          compareTo={offerSA.VPNAmount}
        />
        {currentSA.office365 && (
          <CompareSubRow
            feature="Office 365 Family"
            current={<XorVIcon value={false} />}
            compareTo={<XorVIcon value={true} />}
          />
        )}
        <CompareSubRow
          feature="Rajaton pilvipalvelu"
          current={<XorVIcon value={false} />}
          compareTo={<XorVIcon value={offerSA.cloud ? true : false} />}
        />
        <CompareSubRow
          feature="Ilmainen puhelintuki"
          current={<XorVIcon value={false} />}
          compareTo={<XorVIcon value={offerSA.support} />}
        />
        { currentSA.monthlyPayment ? 
        <CompareSubRow
          feature="Hinta / kuukausi"
          suffix="€/kk"
          current={currentSA.price.toFixed(2)}
          compareTo={(offerSA.price / offerSA.length).toFixed(2)}
        />
        :
        <CompareSubRow
        feature="Hinta / vuosi"
        suffix="€"
        current={currentSA.price.toFixed(2)}
        compareTo={((offerSA.price / offerSA.length) * 12).toFixed(2)}
      />
        }
      </div>
    </>
  );
};

export default CompareSATable;
