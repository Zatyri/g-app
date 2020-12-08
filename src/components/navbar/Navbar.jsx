import React from 'react';
import { Menu } from 'semantic-ui-react';
import NavButton from './NavButton';

const Navbar = ({ activePage, setActivePage, logout, userType }) => {
  const handleClick = (_, { name }) => {
    setActivePage(name);
  };

  return (
    <Menu pointing style={{ marginBottom: '2px' }}>
      <NavButton
        link="/puheliittymat"
        name="puhe"
        color="green"
        activeItem={activePage}
        handleClick={handleClick}
        text="Puheliittymät"
      />
      <NavButton
        link="/nettiliittymat"
        name="netti"
        color="green"
        activeItem={activePage}
        handleClick={handleClick}
        text="Nettiliittymät"
      />
      <NavButton
        link="/tietoturva"
        name="tietoturva"
        color="green"
        activeItem={activePage}
        handleClick={handleClick}
        text="Tietoturva"
      />
      <Menu.Menu position="right">
        {(userType === 'admin' || userType === 'storeadmin') && (
          <NavButton
            link="/admin"
            name="admin"
            activeItem={activePage}
            handleClick={handleClick}
            text="Admin"
            pointer="down"
          />
        )}
        <NavButton
          name="logout"
          activeItem={activePage}
          handleClick={logout}
          text="Kirjaudu ulos"
        />
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
