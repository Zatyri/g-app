import React from 'react';
import { Button, Dropdown, Header, Icon, Table } from 'semantic-ui-react';
import { XorVIcon } from '../../../utils/FormHelpers';
import { OperatorLogo } from '../../../utils/OperatorLogo';
import EditNetSubModal from './EditNetSubModal';

const NetSubTable = ({ allNetSubscriptions, opData, setNetFilterOperator, handleNetDelete }) => {  
  return (
    <>
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
                  <Dropdown.Item onClick={() => setNetFilterOperator()}>
                    kaikki
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {opData.allOperators.map((opRef) => (
                    <Dropdown.Item
                      key={opRef.id}
                      onClick={() => setNetFilterOperator(opRef.name)}
                    >
                      {opRef.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Table.HeaderCell>
            <Table.HeaderCell>Nimi</Table.HeaderCell>
            <Table.HeaderCell>Tekniikka</Table.HeaderCell>            
            <Table.HeaderCell>Nettinopeus</Table.HeaderCell>            
            <Table.HeaderCell>Eu data</Table.HeaderCell>
            <Table.HeaderCell>Aktiivinen</Table.HeaderCell>            
            <Table.HeaderCell>Hinta</Table.HeaderCell>
            <Table.HeaderCell>Muokkaa</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allNetSubscriptions.map((subRef) => (
            <Table.Row key={subRef.id}>
              <Table.Cell className="operatorLogoContainer">
                <OperatorLogo operator={subRef.operator.name} />{' '}
              </Table.Cell>
              <Table.Cell>{subRef.name}</Table.Cell>
              <Table.Cell>{subRef.type}</Table.Cell>            
              <Table.Cell>{subRef.speed}</Table.Cell>    
              <Table.Cell>{subRef.eu}</Table.Cell>
              <Table.Cell>
                <XorVIcon value={subRef.active} />
              </Table.Cell>             
              <Table.Cell>{subRef.price}</Table.Cell>
              <Table.Cell>
                <EditNetSubModal subRef={subRef} />
                <Button
                  id={subRef.id}
                  name={subRef.name}
                  color="red"
                  onClick={handleNetDelete}
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

export default NetSubTable;
