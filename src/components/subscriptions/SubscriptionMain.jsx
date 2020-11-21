import { useQuery } from '@apollo/client';
import React from 'react';

import { ALL_SUBSCRIPTIONS_WITH_OFFER } from '../../queries/subscription';
import { ErrorMessage, Loading } from '../utils/FormHelpers';
import OfferModal from './OfferModal';

const SubscriptMain = () => {
  const { data, loading, error } = useQuery(ALL_SUBSCRIPTIONS_WITH_OFFER);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  let subscriptions = [...data.allSubscriptionsWithOffer].sort(
    (current, next) => next.offerValue - current.offerValue
  );

  return (
    <div className="offerContainer">
      {subscriptions.map((subRef) => (
        <OfferModal key={subRef.id} subRef={subRef} />
      ))}
    </div>
  );
};

export default SubscriptMain;
