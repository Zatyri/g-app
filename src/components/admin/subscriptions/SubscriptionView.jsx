import { useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Dropdown, Header, Icon, Table } from 'semantic-ui-react';

import {
  ALL_OPERATORS,
  ALL_SUBSCRIPTIONS,
  DELETE_SUBSCRIPTION,
} from '../../../queries/subscription';
import { XorVIcon, Loading, ErrorMessage } from '../../utils/FormHelpers';
import { OperatorLogo } from '../../utils/OperatorLogo';
import AddSubscriptionModal from './AddSubscriptionModal';
import EditSubscriptionModal from './EditSubscriptionModal';

const sortingFunction = (sortBy) => {
  switch (sortBy) {
    case 'name':
      return (a, b) => (a.name > b.name ? -1 : 1);
    default:
      return (a, b) => (a.operator.name > b.operator.name ? 1 : -1);
  }
};

const SubscriptionView = () => {
  const { data: subData, error: subError, loading: subLoading } = useQuery(
    ALL_SUBSCRIPTIONS, {
      context: { scope: 'api://gappi/api/user' },
    }
  );
  const { data: opData, error: opError, loading: opLoading } = useQuery(
    ALL_OPERATORS, {
      context: { scope: 'api://gappi/api/user' },
    }
  );
  const [deleteSubscription] = useMutation(DELETE_SUBSCRIPTION, {
    context: { scope: 'api://gappi/api/admin' },
  });
  const [sortFunction, setSortFunction] = useState();
  const [filterOperator, setFilterOperator] = useState();

  if (subLoading || opLoading) {
    return <Loading />;
  }
  if (subError || opError) {
    return <ErrorMessage error={subError} />;
  }

  const handleDelete = async (_, { id, name }) => {
    const confirmation = window.confirm(`Poistetaanko liittymä ${name}`);
    if (!confirmation) {
      return null;
    }
    try {
      await deleteSubscription({
        variables: { id: id },
        update: (cache, { data }) => {
          const cacheId = cache.identify(data.deleteSubscription);
          cache.modify({
            fields: {
              allSubscriptions: (existingFieldData) => {
                const newFieldData = existingFieldData.filter(
                  (subRef) => cacheId !== subRef.__ref
                );
                return newFieldData;
              },
            },
          });
        },
      });
    } catch (error) {
      window.alert(error.message);
    }
  };

  let allSubscriptions = [...subData.allSubscriptions];
  //filters
  filterOperator &&
    (allSubscriptions = [...allSubscriptions].filter(
      (subRef) => subRef.operator.name === filterOperator
    ));
  //sorters
  allSubscriptions.sort(sortingFunction(sortFunction));
  console.log(allSubscriptions[0].name);

  return (
    <>
      <Header as="h2">Liittymähallinta</Header>
      <AddSubscriptionModal />
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Dropdown text="Operaattori" multiple icon="filter">
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilterOperator()}>
                    kaikki
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {opData.allOperators.map((opRef) => (
                    <Dropdown.Item
                      key={opRef.id}
                      onClick={() => setFilterOperator(opRef.name)}
                    >
                      {opRef.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Dropdown
                text="Nimi"
                icon="sort"
                onClick={() =>
                  sortFunction ? setSortFunction() : setSortFunction('name')
                }
              ></Dropdown>
            </Table.HeaderCell>
            <Table.HeaderCell>Puhe</Table.HeaderCell>
            <Table.HeaderCell>Viestit</Table.HeaderCell>
            <Table.HeaderCell>Nettinopeus</Table.HeaderCell>
            <Table.HeaderCell>Rajaton netti</Table.HeaderCell>
            <Table.HeaderCell>Eu data</Table.HeaderCell>
            <Table.HeaderCell>Aktiivinen</Table.HeaderCell>
            <Table.HeaderCell>Vastaavat liittymät</Table.HeaderCell>
            <Table.HeaderCell>Hinta</Table.HeaderCell>
            <Table.HeaderCell>Muokkaa</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allSubscriptions.map((subRef) => (
            <Table.Row key={subRef.id}>
              <Table.Cell className="operatorLogoContainer">
                <OperatorLogo operator={subRef.operator.name} />{' '}
              </Table.Cell>
              <Table.Cell>{subRef.name}</Table.Cell>
              <Table.Cell>{subRef.talk}</Table.Cell>
              <Table.Cell>{subRef.sms}</Table.Cell>
              <Table.Cell>{subRef.speed}</Table.Cell>
              <Table.Cell>
                <XorVIcon value={subRef.unlimited} />
              </Table.Cell>
              <Table.Cell>{subRef.eu}</Table.Cell>
              <Table.Cell>
                <XorVIcon value={subRef.active} />
              </Table.Cell>
              <Table.Cell>{subRef.equivelentSub.name}</Table.Cell>
              <Table.Cell>{subRef.price}</Table.Cell>
              <Table.Cell>
                <EditSubscriptionModal subRef={subRef}/>
                <Button
                  id={subRef.id}
                  name={subRef.name}
                  color="red"
                  onClick={handleDelete}
                >
                  <Icon name="delete" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default SubscriptionView;
