import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';

const NavButton = (props) => {

  

  return (
    <Menu.Item active={props.activeItem === props.name}>
      <Link to={props.link ? props.link : '/'}>
        <Button
          {...props.children}
          name={props.name}
          color={props.color}
          onClick={props.handleClick}
        >
          {props.text}
        </Button>
      </Link>
    </Menu.Item>
  );
};

export default NavButton;
