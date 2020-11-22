import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';
import { ALL_OPERATORS, ALL_SUBSCRIPTIONS } from '../../queries/subscription';
import { ErrorMessage, Loading, XorVIcon } from '../utils/FormHelpers';
import CompareSubRow from './CompareSubRow';
import SelectCurrent from './SelectCurrent';

const CompareOffer = ({ offerSub }) => {
  const { data, loading, error } = useQuery(ALL_SUBSCRIPTIONS);
  const operatorQuery = useQuery(ALL_OPERATORS);
  const [currentSub, setCurrentSub] = useState();
  const [currentSubOffer, setCurrentSubOffer] = useState();

  if (loading || operatorQuery.loading) {
    return <Loading />;
  }

  if (error || operatorQuery.error) {
    return <ErrorMessage error={error} />;
  }

  const subscriptions = [...data.allSubscriptions].filter(
    (subRef) => subRef.operator.name !== offerSub.operator.name
  );

  const handleSelect = (currentSubID, currentSubOfferRef) => {
    
    setCurrentSub(subscriptions.filter((subRef) => currentSubID === subRef.id)[0]);
    setCurrentSubOffer(currentSubOfferRef);
  };

  const operators = [...operatorQuery.data.allOperators].filter(
    (opRef) => opRef.name !== offerSub.operator.name
  );

  if (!currentSub) {
    return (
      <SelectCurrent
        operators={operators}
        subscriptions={subscriptions}
        handleSelect={handleSelect}
      />
    );
  }

  console.log(currentSub);
  return (
    <>
      <Modal.Header>
        <div className="offerModalHeader">Vertailu</div>
      </Modal.Header>
      <Modal.Content>
        <div className='compereRowContainer'>
        <CompareSubRow feature='Puhe' suffix='min' current={currentSub.talk} compareTo={offerSub.talk}/>
        <CompareSubRow feature='Viestit' suffix='kpl' current={currentSub.sms} compareTo={offerSub.sms}/>
        <CompareSubRow feature='Nettinopeus' suffix='Mbit/s' current={currentSub.speed} compareTo={offerSub.speed}/>
        <CompareSubRow feature='Rajaton netti'  current={<XorVIcon value={currentSub.unlimited} />} compareTo={<XorVIcon value={offerSub.unlimited} />}/>
        <CompareSubRow feature='Eu data' suffix='Gt/kk' current={currentSub.eu} compareTo={offerSub.eu}/>
        <CompareSubRow feature='Norm. hinta' suffix='€/kk' current={currentSub.price} compareTo={offerSub.price}/>
        <CompareSubRow feature='Tarjoushinta' suffix='€/kk' current={currentSub.offer ? currentSub.offer : <XorVIcon value={false} />} compareTo={offerSub.offer}/>
        {offerSub.oneTimeDiscount && <CompareSubRow feature='Lahjakortti' suffix='€'  compareTo={offerSub.oneTimeDiscount}/>}
        </div>
      </Modal.Content>
    </>
  );
};

export default CompareOffer;
