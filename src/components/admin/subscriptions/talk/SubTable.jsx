import React from 'react';
import { Button, Dropdown, Header, Icon, Table } from 'semantic-ui-react';
import { XorVIcon } from '../../../utils/FormHelpers';
import { OperatorLogo } from '../../../utils/OperatorLogo';
import EditSubscriptionModal from './EditSubscriptionModal';

const SubTable = ({
  setFilterOperator,
  opData,
  sortFunction,
  setSortFunction,
  allSubscriptions,
  handleDelete,
}) => {
  return (
    <div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              <Header as="h2">Puheliittymät</Header>
            </Table.Cell>
          </Table.Row>
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
                <EditSubscriptionModal subRef={subRef} />
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
    </div>
  );
};

export default SubTable;
