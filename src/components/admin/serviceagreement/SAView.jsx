import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  ALL_SERVICE_AGREEMENTS,
  DELETE_SERVICE_AGREEMENT,
} from '../../../queries/serviceAgreement';
import { ErrorMessage, Loading } from '../../utils/FormHelpers';
import { Header, Menu } from 'semantic-ui-react';
import SATable from './SATable';
import AddSAModal from './AddSAModal';

const SAView = () => {
  const { data, error, loading } = useQuery(ALL_SERVICE_AGREEMENTS, {
    context: { scope: 'api://gappi/api/user' },
  });
  const [deleteServiceAgreement] = useMutation(DELETE_SERVICE_AGREEMENT, {
    context: { scope: 'api://gappi/api/admin' },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error.message} />;
  }

  const handleDelete = async (_, {id,name}) => {
    const confirmation = window.confirm(`Poistetaanko huolenpito ${name}`);
    if (!confirmation) {
      return null;
    }
    try {
      await deleteServiceAgreement({
        variables: {id:id},
        update: (cache, { data }) => {
          const cacheId = cache.identify(data.deleteServiceAgreement);          
          cache.modify({
            fields: {
              allServiceAgreements: (existingFieldData) => {
                console.log(existingFieldData);
                const newFieldData = existingFieldData.filter(
                  (subRef) => cacheId !== (subRef.__ref || `${subRef.__typename}:${subRef.id}`)                  
                );

                return newFieldData;
              },
            },
          });
        }
      })      
    } catch (error) {
      window.alert(error.message);
    }
  }


  return (
    <div style={{ margin: '2em' }}>
      <Header as="h2">Huolenpitohallinta</Header>
      <div className="flexRow flexLeft">
        <Menu>
          <Menu.Item>
            <AddSAModal />
          </Menu.Item>
        </Menu>
      </div>

      <SATable
        allServiceAgreements={data.allServiceAgreements}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default SAView;
