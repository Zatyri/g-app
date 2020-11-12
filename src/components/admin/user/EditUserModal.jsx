import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { UPDATE_USER } from '../../../queries';
import UserForm from './UserForm';

const EditUserModal = (props) => {
  const [open, setOpen] = useState(false);

  const [updateUser] = useMutation(UPDATE_USER);

  const handleUpdateUser = async (values) => {
    try {
      await updateUser({
        variables: {
          id: values.id,
          name: values.name,
          type: values.type,
          store: values.store,
        },
      });
    } catch (error) {
      window.alert(error.message)
      setOpen(false);
    }
 
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button id={props.user.id} onClick={props.handleClick}>
          <Icon name="configure" />
        </Button>
      }
    >
      <Modal.Header>Muokkaa käyttäjää</Modal.Header>
      <Modal.Content>
        <UserForm
          user={props.user}
          modalOpen={setOpen}
          handleModify={handleUpdateUser}
        />
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

export default EditUserModal;
