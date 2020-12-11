import { useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Checkbox, Header, Menu } from 'semantic-ui-react';

import {
  ALL_OPERATORS,
  ALL_SUBSCRIPTIONS,
  DELETE_SUBSCRIPTION,
  ALL_NET_SUBSCRIPTIONS,
  DELETE_NET_SUBSCRIPTION,
} from '../../../queries/subscription';
import { Loading, ErrorMessage } from '../../utils/FormHelpers';

import AddNetSubModal from './net/AddNetSubModal';
import NetSubTable from './net/NetSubTable';
import AddSubscriptionModal from './talk/AddSubscriptionModal';

import SubTable from './talk/SubTable';

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
    ALL_SUBSCRIPTIONS,
    {
      context: { scope: 'api://gappi/api/user' },
    }
  );
  const { data: opData, error: opError, loading: opLoading } = useQuery(
    ALL_OPERATORS,
    {
      context: { scope: 'api://gappi/api/user' },
    }
  );
  const [deleteSubscription] = useMutation(DELETE_SUBSCRIPTION, {
    context: { scope: 'api://gappi/api/admin' },
  });
  const {
    data: netSubData,
    error: netSubError,
    loading: netSubLoading,
  } = useQuery(ALL_NET_SUBSCRIPTIONS, {
    context: { scope: 'api://gappi/api/user' },
  });
  const [deleteNetSubscription] = useMutation(DELETE_NET_SUBSCRIPTION, {
    context: { scope: 'api://gappi/api/admin' },
  });

  const [sortFunction, setSortFunction] = useState();
  const [filterOperator, setFilterOperator] = useState();
  const [netFilterOperator, setNetFilterOperator] = useState();
  const [showSubscriptions, setShowSubscriptions] = useState(true);
  const [showNetSubscriptions, setShowNetSubscriptions] = useState(true);

  if (subLoading || opLoading || netSubLoading) {
    return <Loading />;
  }
  if (subError || opError || netSubError) {
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
  const handleNetDelete = async (_, { id, name }) => {
    const confirmation = window.confirm(`Poistetaanko liittymä ${name}`);
    if (!confirmation) {
      return null;
    }
    try {
      await deleteNetSubscription({
        variables: { id: id },
        update: (cache, { data }) => {
          const cacheId = cache.identify(data.deleteNetSubscription);
          cache.modify({
            fields: {
              allNetSubscriptions: (existingFieldData) => {
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
  let allNetSubscriptions = [...netSubData.allNetSubscriptions];
  //filters
  filterOperator &&
    (allSubscriptions = [...allSubscriptions].filter(
      (subRef) => subRef.operator.name === filterOperator
    ));
  netFilterOperator &&
    (allNetSubscriptions = [...allNetSubscriptions].filter(
      (subRef) => subRef.operator.name === netFilterOperator
    ));
  //sorters
  allSubscriptions.sort(sortingFunction(sortFunction));

  return (
    <div style={{ margin: '2em' }}>
      <Header as="h2">Liittymähallinta</Header>
      <div className="flexRow flexLeft">
        <Menu>
          <Menu.Item>
            <AddSubscriptionModal />
          </Menu.Item>
          <Menu.Item>
            <AddNetSubModal />
          </Menu.Item>
        </Menu>
      </div>
      <div className="subMenu">
        <span>
          <Header as="h4">Näytä:</Header>
        </span>
        <span>
          <Checkbox
            label="Puheliittymät"
            checked={showSubscriptions}
            onClick={() => setShowSubscriptions(!showSubscriptions)}
          />
        </span>
        <span>
          <Checkbox
            label="Nettiliittymät"
            checked={showNetSubscriptions}
            onClick={() => setShowNetSubscriptions(!showNetSubscriptions)}
          />
        </span>
      </div>
      {showSubscriptions && (
        <SubTable
          setFilterOperator={setFilterOperator}
          opData={opData}
          sortFunction={sortFunction}
          setSortFunction={setSortFunction}
          allSubscriptions={allSubscriptions}
          handleDelete={handleDelete}
        />
      )}
      {showNetSubscriptions && (
        <NetSubTable
          setNetFilterOperator={setNetFilterOperator}
          allNetSubscriptions={allNetSubscriptions}
          opData={opData}
          handleNetDelete={handleNetDelete}

        />
      )}
    </div>
  );
};

export default SubscriptionView;
