import React from 'react';

const OfferCardRow = ({ feature, value, suffix }) => {
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
    case 'Kuukausihinta:':
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

export default OfferCardRow;
