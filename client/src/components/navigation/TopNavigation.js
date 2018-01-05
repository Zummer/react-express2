import React from 'react';
import PropType from 'prop-types';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function TopNavigation() {
  return (
    <Menu secondary pointing>
      <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
      <Menu.Menu position="right">
        <Dropdown trigger={<Image/>}>
          <Dropdown.Item>Logout</Dropdown.Item>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
}

TopNavigation.propTypes = {};

export default TopNavigation;

