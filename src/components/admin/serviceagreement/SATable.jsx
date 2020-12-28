import React from 'react';
import { Button, Header, Icon, Table } from 'semantic-ui-react';
import { XorVIcon } from '../../utils/FormHelpers';
import EditSAModal from './EditSAModal';

const SATable = ({ allServiceAgreements, handleDelete }) => {
  if (!allServiceAgreements) {
    return <div>Ei huolenpitopalveluita lisätty</div>;
  }

  return (
    <div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              <Header as="h2">Huolenpito</Header>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Tyyppi</Table.HeaderCell>
            <Table.HeaderCell>Nimi</Table.HeaderCell>
            <Table.HeaderCell>Antivirus</Table.HeaderCell>
            <Table.HeaderCell>Antivirus lisenssit</Table.HeaderCell>
            <Table.HeaderCell>VPN</Table.HeaderCell>
            <Table.HeaderCell>VPN lisenssit</Table.HeaderCell>
            <Table.HeaderCell>Pilvipalvelu</Table.HeaderCell>
            <Table.HeaderCell>Pilvipalvelu rajoitus</Table.HeaderCell>
            <Table.HeaderCell>Office 365</Table.HeaderCell>
            <Table.HeaderCell>Puhelintuki</Table.HeaderCell>
            <Table.HeaderCell>Remote Fix</Table.HeaderCell>
            <Table.HeaderCell>Pituus</Table.HeaderCell>
            <Table.HeaderCell>Hinta</Table.HeaderCell>
            <Table.HeaderCell>Muokkaa</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allServiceAgreements.map((SARef) => (
            <Table.Row key={SARef.id}>
              <Table.Cell>{SARef.type}</Table.Cell>
              <Table.Cell>{SARef.name}</Table.Cell>
              <Table.Cell>{SARef.antiVirus}</Table.Cell>
              <Table.Cell>{SARef.antiVirusAmount}</Table.Cell>
              <Table.Cell>
                <XorVIcon value={SARef.VPN} />
              </Table.Cell>
              <Table.Cell>{SARef.VPNAmount}</Table.Cell>
              <Table.Cell>{SARef.cloud}</Table.Cell>
              <Table.Cell>{SARef.cloudLimit}</Table.Cell>
              <Table.Cell>
                <XorVIcon value={SARef.office365} />
              </Table.Cell>
              <Table.Cell>
                <XorVIcon value={SARef.support} />
              </Table.Cell>
              <Table.Cell>
                <XorVIcon value={SARef.remoteFix} />
              </Table.Cell>
              <Table.Cell>{SARef.length}</Table.Cell>
              <Table.Cell>{SARef.price}</Table.Cell>
              <Table.Cell>
                {<EditSAModal SARef={SARef} />}
                <Button
                  id={SARef.id}
                  name={SARef.name}
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
    </div>
  );
};

export default SATable;
