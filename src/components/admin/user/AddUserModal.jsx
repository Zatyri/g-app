import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { ADD_USER } from '../../../queries';
import AddUserForm from './AddUserForm';

const AddUserModal = () => {
  const [open, setOpen] = useState(false);
  const [addUser] = useMutation(ADD_USER);

  const handleAddUser = async ({ name, username, store, type, password }) => {
    try {
      await addUser({
        variables: { name, username, store, type, password },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              allUsers: (existingFieldData) => {
                const newFieldData = [...existingFieldData, data.addUser];
                return newFieldData;
              },
            },
          });
        },
      });

      setOpen(false);
    } catch (error) {
      window.alert(error.message);
      setOpen(false);
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Lisää käyttäjä</Button>}
    >
      <Modal.Header>Lisää käyttäjä</Modal.Header>
      <Modal.Content>
        <AddUserForm handleAddUser={handleAddUser} />
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Peruuta"
          icon="delete"
          onClick={() => setOpen(false)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddUserModal;
