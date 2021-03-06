import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Header, Input, Modal } from 'semantic-ui-react';

import { ALL_OPERATORS, ALL_NET_SUBSCRIPTIONS } from '../../queries/subscription';
import { ErrorMessage, Loading, AddRemoveInput } from '../utils/FormHelpers';
import CompareOfferTable from '../subscriptions/CompareOfferTable';
import CompareSubRow from '../subscriptions/CompareSubRow';
import SelectCurrent from '../subscriptions/SelectCurrent';

const CompareOffer = ({ offerSub, handleClose, handleShoppingCart }) => {
  const { data, loading, error } = useQuery(ALL_NET_SUBSCRIPTIONS, {
    context: { scope: 'api://gappi/api/user' },
  });
  const operatorQuery = useQuery(ALL_OPERATORS, {
    context: { scope: 'api://gappi/api/user' },
  });
  const [currentSub, setCurrentSub] = useState();
  const [currentSubOffer, setCurrentSubOffer] = useState();
  const [amount, setAmount] = useState(1);
  const [manualOffer, setManualOffer] = useState(false);

  if (loading || operatorQuery.loading) {
    return <Loading />;
  }

  if (error || operatorQuery.error) {
    return <ErrorMessage error={error} />;
  }

  const subscriptions = [...data.allNetSubscriptions].filter(
    (subRef) => subRef.operator.name !== offerSub.operator.name
  );

  const handleSelect = (currentSubID, currentSubOfferRef) => {
    setCurrentSub(
      subscriptions.filter((subRef) => currentSubID === subRef.id)[0]
    );
    currentSubOfferRef && setCurrentSubOffer(currentSubOfferRef.toFixed(2));
  };

  const handleManualOffer = () => {
    const handleChange = (e) => {
      const value = e.target.value;
      const regEx = /^[0-9]+$/g;
      if (value.length > 2) {
        return null;
      } else if (regEx.test(value) || value === '') {
        setManualOffer(value);
      }
    };

    if (typeof manualOffer === 'string') {
      return (
        <CompareSubRow
          feature="Lahjakortti"
          compareTo={
            <Input
              fluid
              type="text"
              value={manualOffer}
              onChange={handleChange}
            />
          }
        />
      );
    }
    return <Button icon="add" onClick={() => setManualOffer('0')} />;
  };

  const handleAddSub = () => {
    const newCartObject = {
      id: offerSub.id.concat(currentSub.id),
      offer: manualOffer
        ? { ...offerSub, oneTimeDiscount: manualOffer }
        : offerSub,
      current: currentSubOffer
        ? { ...currentSub, offer: currentSubOffer }
        : currentSub,
      amount: amount,
    };
    handleShoppingCart('ADD', newCartObject);
    handleClose();
  };

  const handleChangeCurrent = () => {
    setCurrentSub();
    setCurrentSubOffer();
  };

  const handleAmount = (action) => {
    if (amount < 1) {
      setAmount(1);
    } else if (action === 'ADD') {
      setAmount(amount + 1);
    } else if (action === 'SUBTRACT') {
      amount > 1 && setAmount(amount - 1);
    } else {
      console.log('wrong input in handleAmount');
    }
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
        handleClose={handleClose}
      />
    );
  }

  return (
    <>
      <Modal.Header>
        <div className="flexRow">
          <Header className="offerModalHeader">Liittymävertailu</Header>
          <Button className="closeButton" onClick={handleClose} icon="x" />
        </div>
      </Modal.Header>
      <Modal.Content>
        <CompareOfferTable
          currentSub={currentSub}
          offerSub={offerSub}
          currentSubOffer={currentSubOffer}
          handleManualOffer={handleManualOffer}
        />
      </Modal.Content>
      <Modal.Actions className="flexRow">
        <Button onClick={handleChangeCurrent}>Vaihda nykyistä liittymää</Button>
        <AddRemoveInput action={handleAmount} amount={amount} />

        <Button
          content="Lisää koriin"
          labelPosition="right"
          icon="plus"
          positive
          onClick={handleAddSub}
        />
      </Modal.Actions>
    </>
  );
};

export default CompareOffer;
