import React from 'react';
import Router from 'react-router';
let { Route, DefaultRoute } = Router;

import DWCharManagerApp from './components/DWCharManagerApp.react';
import Dashboard from './components/Dashboard.react';
import CharacterForm from './components/CharacterForm.react';

const routes = (
  <Route path='/' handler={DWCharManagerApp}>
    <DefaultRoute handler={Dashboard} />
    <Route name='new' path='/new' handler={CharacterForm} />
    <Route name='show' path=':id' handler={Dashboard} />
  </Route>
);

export default routes
