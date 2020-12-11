import React from 'react';
import { useMutation } from '@apollo/client';

import { Button, Icon, Table } from 'semantic-ui-react';

import { OperatorLogo } from '../../utils/OperatorLogo';
import { REMOVE_OFFER, REMOVE_NET_OFFER } from '../../../queries/subscription';
import { XorVIcon } from '../../utils/FormHelpers';

const OfferDisplayTable = ({ operator, subscriptions }) => {
  const [removeOffer] = useMutation(REMOVE_OFFER, {
    context: { scope: 'api://gappi/api/storeadmin' },
  });
  const [removeNetOffer] = useMutation(REMOVE_NET_OFFER, {
    context: { scope: 'api://gappi/api/storeadmin' },
  });


  const headers = ['Nimi', 'Tarjoushinta', 'Alennus', 'Pituus(kk)', 'Määräaika', 'Luokka', 'Poista'];

  const handleDelete = async (_, { id }) => {
    if (!window.confirm('Haluatko varmasti poistaa tarjouksen?')) {
      return null;
    }
    try {
      return await removeOffer({
        variables: { id: id },
        update: (cache, { data }) => {
          const cacheId = cache.identify(data.removeOffer);          
          cache.modify({
            fields: {
              allSubscriptionsWithOffer: (existingFieldData) => {              
                const newFieldData = existingFieldData.filter(
                  (subRef) => cacheId !== (subRef.__ref || `Subscription:${subRef.id}`)
                );
                return newFieldData;
              },
            },
          });
        },
      });
    } catch (error) {
      window.alert(error);
    }
  };

 
  const handleNetDelete = async (_, { id }) => {
    if (!window.confirm('Haluatko varmasti poistaa tarjouksen?')) {
      return null;
    }
    try {      
      return await removeNetOffer({
        variables: { id: id },
        update: (cache, { data }) => {   
              console.log(data);
          const cacheId = cache.identify(data.removeNetOffer);
             
          cache.modify({
            fields: {
              allNetSubscriptionsWithOffer: (existingFieldData) => {                         
                const newFieldData = existingFieldData.filter(                  
                  (subRef) => cacheId !== (subRef.__ref || `NetSubscription:${subRef.id}`)                  
                );              
                return newFieldData;
              },
            },
          });
        },
      });
    } catch (error) {     
      window.alert(error);
    }
  };

  return (
    <div className="offerContainer">
      <OperatorLogo operator={operator} />
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            {headers.map((headerRef) => (
              <Table.HeaderCell key={headerRef}>{headerRef}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {subscriptions
            .filter((subRef) => subRef.operator.name === operator)
            .map((subRef) => (
              <Table.Row key={subRef.id}>
                <Table.Cell>{subRef.name}</Table.Cell>
                <Table.Cell>{subRef.offer}</Table.Cell>
                <Table.Cell>{subRef.oneTimeDiscount}</Table.Cell>
                <Table.Cell>{subRef.offerLength}</Table.Cell>
                <Table.Cell><XorVIcon value={subRef.bindingOffer} /></Table.Cell>                
                <Table.Cell>{subRef.offerValue}</Table.Cell>

                <Table.Cell>
                  <Button
                    id={subRef.id}
                    name={subRef.name}
                    color="red"
                    onClick={subRef.type ? handleNetDelete :  handleDelete}
                  >                                      
                    <Icon name="delete" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default OfferDisplayTable;
