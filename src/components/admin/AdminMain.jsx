import React from "react";
import { Menu } from "semantic-ui-react";
import NavButton from "../navbar/NavButton";

const AdminMain = () => {
  return (
    <>
      <Menu size='mini' style={{marginTop: "2px"}}>
        <Menu.Menu position='right'>
        <NavButton link="/admin" name="lisaaLiittyma" text="Lisää liittymä" />
        <NavButton link="/admin" name="tarjous" text="Tarjoukset" />
        <NavButton link="/admin" name="kayttaja" text="Käyttäjähallinta" />
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default AdminMain;
