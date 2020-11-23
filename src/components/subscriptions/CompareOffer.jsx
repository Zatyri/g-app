import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { ALL_OPERATORS, ALL_SUBSCRIPTIONS } from '../../queries/subscription';
import { ErrorMessage, Loading, XorVIcon, AddRemoveInput } from '../utils/FormHelpers';
import { OperatorLogo } from '../utils/OperatorLogo';
import CompareSubRow from './CompareSubRow';
import SelectCurrent from './SelectCurrent';

const CompareOffer = ({ offerSub, handleClose, handleShoppingCart }) => {
  const { data, loading, error } = useQuery(ALL_SUBSCRIPTIONS);
  const operatorQuery = useQuery(ALL_OPERATORS);
  const [currentSub, setCurrentSub] = useState();
  const [currentSubOffer, setCurrentSubOffer] = useState();
  const [amount, setAmount] = useState(1);

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
    setCurrentSub(
      subscriptions.filter((subRef) => currentSubID === subRef.id)[0]
    );
    currentSubOfferRef && setCurrentSubOffer(currentSubOfferRef.toFixed(2));
  };

  const handleAddSub = () => {
    const newCartObject = {
      id: offerSub.id,
      offer: offerSub,
      current: currentSub,
      amount: amount
    }
    handleShoppingCart('ADD', offerSub);
    handleClose();
  };

  const handleChangeCurrent = () => {
    setCurrentSub();
    setCurrentSubOffer();
  };

  const handleAmount = (action) => {
    console.log(amount);
    if(amount < 1){
      setAmount(1)
    } else if (action === 'ADD'){
      setAmount(amount + 1)
    } else if (action === 'SUBTRACT'){      
      amount > 1 && setAmount(amount - 1)
    } else {
      console.log('wrong input in handleAmount');
    }
  }

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
        <div className="compereRowContainer">
          <div className="compareHeader">
            <div className="flexColumn">
              <OperatorLogo operator={currentSub.operator.name} />
              <Header as="h3">{currentSub.name}</Header>
            </div>
            <span />
            <div className="flexColumn">
              <OperatorLogo operator={offerSub.operator.name} />
              <Header as="h3">{offerSub.name}</Header>
            </div>
          </div>

          <CompareSubRow
            feature="Puhe"
            suffix="min"
            current={currentSub.talk}
            compareTo={offerSub.talk}
          />
          <CompareSubRow
            feature="Viestit"
            suffix="kpl"
            current={currentSub.sms}
            compareTo={offerSub.sms}
          />
          <CompareSubRow
            feature="Nettinopeus"
            suffix="Mbit/s"
            current={currentSub.speed}
            compareTo={offerSub.speed}
          />
          <CompareSubRow
            feature="Rajaton netti"
            current={<XorVIcon value={currentSub.unlimited} />}
            compareTo={<XorVIcon value={offerSub.unlimited} />}
            unlimitedDataCurrent={currentSub.unlimited}
            unlimitedDataOffer={offerSub.unlimited}
          />
          <CompareSubRow
            feature="Eu data"
            suffix="Gt/kk"
            current={currentSub.eu}
            compareTo={offerSub.eu}
          />
          <CompareSubRow
            feature="Norm. hinta"
            suffix="€/kk"
            current={currentSub.price}
            compareTo={offerSub.price}
          />
          <CompareSubRow
            feature="Tarjoushinta"
            suffix="€/kk"
            current={
              currentSubOffer ? currentSubOffer : <XorVIcon value={false} />
            }
            compareTo={offerSub.offer}
          />
              <CompareSubRow
            feature='Tarjouksen pituus'
            suffix={`kk${offerSub.bindingOffer ? '*' : ''}`}
            compareTo={offerSub.offerLength}
            />
            {!offerSub.bindingOffer ? <CompareSubRow 
            feature='Ei määräaikaa'
            compareTo={<XorVIcon value={true}/>}
            />: null  
          }
          {offerSub.oneTimeDiscount ? (
            <CompareSubRow
              feature="Lahjakortti"
              suffix="€"
              compareTo={offerSub.oneTimeDiscount}
            />
          ) : null}
      
        </div>
      </Modal.Content>
      <Modal.Actions className='flexRow'>
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
