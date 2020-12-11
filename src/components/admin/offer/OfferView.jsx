import React from 'react';
import { useQuery } from '@apollo/client';

import { Header } from 'semantic-ui-react';

import { ALL_SUBSCRIPTIONS_WITH_OFFER, ALL_NET_SUBSCRIPTIONS_WITH_OFFER } from '../../../queries/subscription';
import { ErrorMessage, Loading } from '../../utils/FormHelpers';
import AddOfferModal from './AddOfferModal';

import OfferDisplayTable from './OfferDisplayTable';

const OfferView = () => {
  const { data: subData, error: subError, loading: subLoading } = useQuery(ALL_SUBSCRIPTIONS_WITH_OFFER, {
    context: { scope: 'api://gappi/api/user' },
  });
  const { data: netData, error: netError, loading: netLoading } = useQuery(ALL_NET_SUBSCRIPTIONS_WITH_OFFER, {
    context: { scope: 'api://gappi/api/user' },
  });


  if (subLoading || netLoading) {
    return <Loading />;
  }
  if (subError || netError) {
    return <ErrorMessage error={subError || netError} />;
  }

  return (
    <div className="tableContainer">
      <Header as="h2">Tarjoukset</Header>
      <AddOfferModal />
      <div className='flexRow flexTop'>
        <OfferDisplayTable
          operator="Dna"
          subscriptions={subData.allSubscriptionsWithOffer}
        />
        <OfferDisplayTable
          operator="Dna"
          subscriptions={netData.allNetSubscriptionsWithOffer}
        />
      </div>

      <div className='flexRow flexTop'>
        <OfferDisplayTable
          operator="Elisa"
          subscriptions={subData.allSubscriptionsWithOffer}
        />
               <OfferDisplayTable
          operator="Elisa"
          subscriptions={netData.allNetSubscriptionsWithOffer}
        />
      </div>

      <div className='flexRow flexTop'>
        <OfferDisplayTable
          operator="Telia"
          subscriptions={subData.allSubscriptionsWithOffer}
        />
               <OfferDisplayTable
          operator="Telia"
          subscriptions={netData.allNetSubscriptionsWithOffer}
        />
      </div>
    </div>
  );
};

export default OfferView;
