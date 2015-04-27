import React from 'react';
import Router from 'react-router';
let { Route, DefaultRoute } = Router;

import DWCharManagerApp from './components/DWCharManagerApp.react';
import CharacterForm from './components/CharacterForm.react';
import CharacterSheet from './components/CharacterSheet.react';

const routes = (
  <Route path='/' handler={DWCharManagerApp}>
    <DefaultRoute handler={CharacterSheet} />
    <Route name='new' path='/new' handler={CharacterForm} />
    <Route name='show' path=':id' handler={CharacterSheet} />
  </Route>
);

export default routes
