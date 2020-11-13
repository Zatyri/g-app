import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { ME } from '../../queries/user';
import NavButton from '../navbar/NavButton';
import SubscriptionView from './subscriptions/SubscriptionView';
import UserView from './user/UserView';

const AdminMain = () => {
  const [view, setView] = useState('tarjous');
  const {data, loading, error} = useQuery(ME);  

  if(loading){
    return null
  }
  if(error){
    return <div>error</div>
  }
  if(data.me.type === 'store'){
    return null
  }
 

  const showView = () => {
    switch (view) {
      case 'tarjous':
        return <div>tarjous</div>;
      case 'kayttaja':
        return <UserView/>;
      case 'liittyma':
        return <SubscriptionView/>
      default:
        return undefined;
    }
  };

  const handleClick = (_, { name }) => {
    setView(name);
  };

  return (
    <>
      <Menu size="mini" style={{ marginTop: '2px' }}>
        <Menu.Menu position="right">
          <NavButton
            link="/admin"
            name="liittyma"
            text="Liittymähallinta"
            handleClick={handleClick}
          />
          <NavButton
            link="/admin"
            name="tarjous"
            text="Tarjoukset"
            handleClick={handleClick}
          />
          <NavButton
            link="/admin"
            name="kayttaja"
            text="Käyttäjähallinta"
            handleClick={handleClick}
          />
        </Menu.Menu>
      </Menu>
      {showView()}
    </>
  );
};

export default AdminMain;
