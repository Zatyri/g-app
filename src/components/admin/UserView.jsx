import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Button, Header, Icon, Placeholder, Table } from 'semantic-ui-react';
import { ALL_USERS, DELETE_USER } from '../../queries';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

const UserView = () => {
  const { data, error, loading } = useQuery(ALL_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  if (loading) {
    return (
      <Placeholder className="tableContainer">
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder>
    );
  }
  if (error) {
    return <div>Virhe</div>;
  }

  const handleDeleteUser = async (_, { id, name }) => {
    const confirm = window.confirm(`Poistetaanko käyttäjä: ${name}?`);
    if (!confirm) {
      return null;
    }
    try {
      await deleteUser({
        variables: { id: id },
        update: (cache, { data }) => {
          const cacheId = cache.identify(data.deleteUser);
          cache.modify({
            fields: {
              allUsers: (existingFieldData) => {
                const newFieldData = existingFieldData.filter(
                  (user) => cacheId !== user.__ref
                );
                return newFieldData;
              },
            },
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tableContainer">
      <Header as="h2">Käyttäjähallinta</Header>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nimi</Table.HeaderCell>
            <Table.HeaderCell>Käyttäjänimi</Table.HeaderCell>
            <Table.HeaderCell>Käyttäjätyyppi</Table.HeaderCell>
            <Table.HeaderCell>Talo</Table.HeaderCell>
            <Table.HeaderCell>Muokkaa</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.allUsers.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.type}</Table.Cell>
              <Table.Cell>{user.store}</Table.Cell>
              <Table.Cell>
                <EditUserModal user={user}/>
    
                {!(user.type === 'admin') && (
                  <Button
                    id={user.id}
                    name={user.name}
                    onClick={handleDeleteUser}
                    color="red"
                  >
                    <Icon name="delete" />
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>      
      <AddUserModal />
    </div>
  );
};

export default UserView;
