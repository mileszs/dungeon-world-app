import React from 'react';
import Router from 'react-router';
let { Route, DefaultRoute, RouteHandler, Link } = Router;

import {Nav, NavItem} from 'react-bootstrap'
import {NavItemLink} from 'react-router-bootstrap'

import _ from 'lodash';

import CharacterActions from '../actions/CharacterActions';
import CharacterList from './CharacterList.react';

import CharacterStore from '../stores/CharacterStore';

function getState() {
  let {characters, current} = CharacterStore.getState()
  return {
    characters: characters,
    current: current,
  };
}

let DWCharManagerApp = React.createClass({
  getInitialState() {
    CharacterActions.load()
    return getState()
  },

  render() {
    return (
      <div>
        <div className="row">
          <CharacterList characters={this.state.characters} currentChar={this.state.current} />
        </div>

        <div className="details">
          <RouteHandler {...this.props} characters={this.state.characters} current={this.state.current} />
        </div>
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.params && nextProps.params.id && ( this.state.current && nextProps.params.id != this.state.current.id)) {
      CharacterActions.switchChar(nextProps.params.id)
    }
  },

  componentDidMount() {
    CharacterStore.listen(this._onChange);
  },

  componentWillUnmount() {
    CharacterStore.unlisten(this._onChange);
  },

  _onChange() {
    this.setState(getState());
  }
});

export default DWCharManagerApp;
