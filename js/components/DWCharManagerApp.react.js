import React from 'react';
import Router from 'react-router';
let { Route, DefaultRoute, RouteHandler, Link } = Router;

import _ from 'lodash';

import CharacterForm from './CharacterForm.react';
import Dashboard from './Dashboard.react';

let DWCharManagerApp = React.createClass({

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="newCharacter">New Character</Link></li>
        </ul>
        <div className="details">
          <RouteHandler />
        </div>
      </div>
    );
  },
});

export default DWCharManagerApp;
