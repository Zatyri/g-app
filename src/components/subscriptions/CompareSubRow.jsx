import React from 'react';

const CompareSubRow = ({ feature, current, compareTo, suffix }) => {
  return (
    <div className="offerCardLine compareLine">
      {feature !== 'Lahjakortti' ? (
        <>
          <p className='compareItem'>
            {current}
            <span className="small"> {current !== 'Rajaton' && suffix}</span>
          </p>
          <span />
        </>
      ) : (
        <>
          <p className='compareItem'> </p>
          <span style={{ borderBottom: '0' }} />
        </>
      )}
      <p>{feature}</p>
      <span />
      <p className='compareItem'>
        {compareTo}
        <span className="small"> {compareTo !== 'Rajaton' && suffix}</span>
      </p>
    </div>
  );
};

export default CompareSubRow;
