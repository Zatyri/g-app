import { useQuery } from '@apollo/client';
import React from 'react';
import { ALL_SERVICE_AGREEMENTS } from '../../queries/serviceAgreement';
import { ErrorMessage, Loading } from '../utils/FormHelpers';
import SAModal from './SAModal';

const SAMain = ({ handleShoppingCart }) => {
  const { data, loading, error } = useQuery(ALL_SERVICE_AGREEMENTS, {
    context: { scope: 'api://gappi/api/user' },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const serviceAgreements = [...data.allServiceAgreements];

  return (
    <div className="offerContainer">
      {serviceAgreements.map((SARef) => (
        <SAModal
          key={SARef.id}
          SARef={SARef}
          handleShoppingCart={handleShoppingCart}
        />
      ))}
    </div>
  );
};

export default SAMain;
