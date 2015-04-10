import React from 'react';
import Router from 'react-router';
let { Route, DefaultRoute, RouteHandler, Link } = Router;

import {Nav, NavItem} from 'react-bootstrap'
import {NavItemLink} from 'react-router-bootstrap'

import _ from 'lodash';

import CharacterForm from './CharacterForm.react';
import Dashboard from './Dashboard.react';

let DWCharManagerApp = React.createClass({

  render() {
    return (
      <div>
        <Nav bsStyle='pills'>
          <NavItemLink eventKey={1} to="/">Dashboard</NavItemLink>
          <NavItemLink eventKey={2} to="newCharacter">New Character</NavItemLink>
        </Nav>

        <div className="details">
          <RouteHandler />
        </div>
      </div>
    );
  },
});

export default DWCharManagerApp;
