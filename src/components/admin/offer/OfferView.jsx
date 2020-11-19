import { useQuery } from '@apollo/client'
import React from 'react'
import { Header } from 'semantic-ui-react'
import { ALL_SUBSCRIPTIONS_WITH_OFFER } from '../../../queries/subscription'
import { ErrorMessage, Loading } from '../../utils/FormHelpers'
import AddOfferModal from './AddOfferModal'

import OfferDisplayTable from './OfferDisplayTable'

const OfferView = () => {
  const {data, error, loading} = useQuery(ALL_SUBSCRIPTIONS_WITH_OFFER)

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className='tableContainer'>
    <Header as='h2'>Tarjoukset</Header>
    <AddOfferModal />
    <OfferDisplayTable operator='Dna' subscriptions={data.allSubscriptionsWithOffer} />
    <OfferDisplayTable operator='Elisa' subscriptions={data.allSubscriptionsWithOffer} />
    <OfferDisplayTable operator='Telia' subscriptions={data.allSubscriptionsWithOffer} />
      
    </div>
  )
}

export default OfferView
