import React from 'react';
import Router from 'react-router';
let { Route, DefaultRoute } = Router;

import _ from 'lodash';

import DWCharManagerApp from './components/DWCharManagerApp.react';
import Dashboard from './components/Dashboard.react';
import CharacterForm from './components/CharacterForm.react';

const routes = (
  <Route handler={DWCharManagerApp}>
    <DefaultRoute handler={Dashboard} />
    <Route name="newCharacter" handler={CharacterForm} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
