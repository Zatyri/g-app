import React from 'react';
import { Icon } from 'semantic-ui-react';

const CompareSubRow = ({
  feature,
  current,
  compareTo,
  suffix,
  unlimitedDataCurrent,
  unlimitedDataOffer,
  offerBetter,
  
}) => {
  const showStar = () => {
    switch (feature) {
      case 'Puhe':
      case 'Viestit':
        if (current === 'Rajaton') {
          return false;
        } else if (compareTo === 'Rajaton') {
          return true;
        } else if (compareTo > current) {
          return true;
        } else {
          return false;
        }
      case 'Nettinopeus':
      case 'Eu data':
        if (compareTo > current) {
          return true;
        }
        return false;
      case 'Norm. hinta':
        if (compareTo <= current) {
          return true;
        } else {
          return false;
        }
      case 'Tarjoushinta':
        if (typeof current === 'object') {
          return true;
        } else if (compareTo <= current) {
          return true;
        } else {
          return false;
        }
      case 'Lahjakortti':
        return true;

      case 'Rajaton netti':
        if (unlimitedDataCurrent) {
          return false;
        } else if (unlimitedDataOffer) {
          return true;
        } else {
          return false;
        }
      case 'Ei määräaikaa':
        return true;
      case 'Tietoturva':
        return offerBetter ? true : false;
      case 'Tietoturva lisenssit':
        return current < compareTo ? true : false;
      case 'VPN lisenssit':
        return current < compareTo ? true : false;
      case 'VPN':
        return offerBetter ? true : false;
      case 'Rajaton pilvipalvelu':
        return current ? true : false;
      case 'Ilmainen puhelintuki':
        return current ? true : false;
      case 'Hinta / kuukausi':        
        return current >= compareTo ? true : false;
      default:
        return false;
    }
  };

  return (
    <div className="offerCardLine compareLine">
      {feature === 'Tarjouksen pituus' ||
      feature === 'Lahjakortti' ||
      feature === 'Ei määräaikaa' ? (
        <>
          <div className="compareItem"> </div>
          <span style={{ borderBottom: '0' }} />
        </>
      ) : (
        <>
          <div
            className={`compareItem left ${
              typeof current === 'object' && 'center'
            }`}
          >
            {current}
            <span className="small">
              {' '}
              {current !== 'Rajaton' && typeof current !== 'object' && suffix}
            </span>
          </div>
          <span />
        </>
      )}
      <p>{feature}</p>
      <span />
      <div
        className={`compareItem ${typeof compareTo === 'object' && 'center'}`}
      >
        {compareTo}
        <span className="small"> {compareTo !== 'Rajaton' && suffix}</span>
      </div>
      {showStar() ? <Icon name="star" color="yellow" /> : <Icon />}
    </div>
  );
};

export default CompareSubRow;
