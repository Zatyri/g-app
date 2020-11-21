import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_OPERATORS, ALL_SUBSCRIPTIONS } from '../../queries/subscription';
import { ErrorMessage, Loading } from '../utils/FormHelpers';
import SelectCurrent from './SelectCurrent';

const CompareOffer = ({ offerSub }) => {
  const { data, loading, error } = useQuery(ALL_SUBSCRIPTIONS);
  const operatorQuery = useQuery(ALL_OPERATORS)
  const [currentSub, setCurrentSub] = useState();

  if (loading || operatorQuery.loading) {
    return <Loading />;
  }

  if (error || operatorQuery.error) {
    return <ErrorMessage error={error} />;
  }

  

  const subscriptions = [...data.allSubscriptions].filter(
    (subRef) => subRef.operator.name !== offerSub.operator.name
  );
  
  const operators = [...operatorQuery.data.allOperators].filter(opRef=> opRef.name !== offerSub.operator.name)

if(!currentSub){
  return <SelectCurrent operators={operators} subscriptions={subscriptions} />
}



  return <div></div>;
};

export default CompareOffer;
