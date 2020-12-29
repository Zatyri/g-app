import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react';
import { EDIT_SERVICE_AGREEMENT } from '../../../queries/serviceAgreement';
import EditSAForm from './EditSAForm';

const EditSAModal = (props) => {
  const [open, setOpen] = useState(false);
  const [editServiceAgreement] = useMutation(EDIT_SERVICE_AGREEMENT, {
    context: { scope: 'api://gappi/api/admin' },
  });

  const handleUpdateSA = async ({
    id,
    type,
    name,
    antiVirus,
    antiVirusAmount,
    VPN,
    VPNAmount,
    cloud,
    cloudLimit,
    office365,
    support,
    remoteFix,
    length,
    price,
  }) => {
    try {
      await editServiceAgreement({
        variables: {
          id,
          type,
          name,
          antiVirus,
          antiVirusAmount,
          VPN,
          VPNAmount,
          cloud,
          cloudLimit,
          office365,
          support,
          remoteFix,
          length,
          price: price.toString(),
        },
      });
      setOpen(false);
    } catch (error) {
      window.alert(error.message);
      setOpen(false);
    }
  }

  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={
      <Button id={props.SARef.id} onClick={props.handleClick}>
        <Icon name="configure" />
      </Button>
    }
  >
    <Modal.Header>Muokkaa</Modal.Header>
    <Modal.Content>
      <EditSAForm handleUpdateSA={handleUpdateSA} SARef={props.SARef}/>
  
    </Modal.Content>
    <Modal.Actions>
      <Button
        type="submit"
        form="editSAForm"
        content="Tallenna"
        icon="checkmark"
        positive
      />
      <Button
        content="Peruuta"
        icon="delete"
        onClick={() => setOpen(false)}
      />
    </Modal.Actions>
  </Modal>
  )
}

export default EditSAModal
