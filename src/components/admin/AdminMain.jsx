import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

import NavButton from '../navbar/NavButton';
import OfferView from './offer/OfferView';
import SubscriptionView from './subscriptions/SubscriptionView';

const AdminMain = () => {
  const [view, setView] = useState('tarjous');

  const showView = () => {
    switch (view) {
      case 'tarjous':
        return <OfferView />; 
      case 'liittyma':
        return <SubscriptionView />
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

        </Menu.Menu>
      </Menu>
      {showView()}
    </>
  );
};

export default AdminMain;
