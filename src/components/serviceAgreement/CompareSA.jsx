import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { ALL_OPERATORS } from '../../queries/subscription';
import { AddRemoveInput, ErrorMessage, Loading } from '../utils/FormHelpers';
import CompareSATable from './CompareSATable';
import SelectCurrentSA from './SelectCurrentSA';

const CompareSA = ({ offer, handleClose, handleShoppingCart }) => {
  const operatorQuery = useQuery(ALL_OPERATORS, {
    context: { scope: 'api://gappi/api/user' },
  });
  const [currentSA, setCurrentSA] = useState();
  const [amount, setAmount] = useState(1);

  if (operatorQuery.loading) {
    return <Loading />;
  }

  if (operatorQuery.error) {
    return <ErrorMessage error={operatorQuery.error} />;
  }

  const handleSelect = ({antiVirus, antiVirusAmount, VPN, VPNAmount, monthlyPayment, price, operator}) => {
    const currentSAObject = {
      operator,
      antiVirus,
      antiVirusAmount,
      VPN,
      VPNAmount,
      monthlyPayment,
      price
    };

    setCurrentSA(currentSAObject);
  };

  const handleChangeCurrent = () => {
    setCurrentSA();
  };

  const handleAddToShoppingCart = () => {
    const newCartObject = {
      id: offer.id.concat(currentSA.id),
      offer: offer,
      current: currentSA,
      amount: amount,
    }    
    handleShoppingCart('ADD', newCartObject);
    handleClose();
  }

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

  const operators = [...operatorQuery.data.allOperators, {id: 1234 ,name: 'muu'}];

  if (!currentSA) {
    return (
      <SelectCurrentSA
        operators={operators}        
        handleSelect={handleSelect}
        handleClose={handleClose}
      />
    );
  }

  return  (
    <>
      <Modal.Header>
        <div className="flexRow">
          <Header className="offerModalHeader">Vertailu</Header>
          <Button className="closeButton" onClick={handleClose} icon="x" />
        </div>
      </Modal.Header>
      <Modal.Content>
        
        <CompareSATable
          currentSA={currentSA}
          offerSA={offer}          
        />

      </Modal.Content>
      <Modal.Actions className="flexRow">
        <Button onClick={handleChangeCurrent}>Vaihda nykyistä tietoturvaa</Button>
        <AddRemoveInput action={handleAmount} amount={amount} />

        <Button
          content="Lisää koriin"
          labelPosition="right"
          icon="plus"
          positive
          onClick={handleAddToShoppingCart}
        />
      </Modal.Actions>
    </>
  );
};

export default CompareSA;
