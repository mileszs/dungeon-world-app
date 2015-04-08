import React from 'react';
import _ from 'lodash';
import CharacterActions from '../actions/CharacterActions';
import RollActions from '../actions/RollActions';
import CharacterBox from './CharacterBox.react';
import DiceBox from './DiceBox.react';
import CurrentCharacterDetails from './CurrentCharacterDetails.react';

import CharacterStore from '../stores/CharacterStore';
import RollStore from '../stores/RollStore';
import StatStore from '../stores/StatStore';

function getAppState() {
  let current = CharacterStore.current()
  let rolls = []
  if (current) {
    rolls = RollStore.getCharacterRolls(current.id);
  }
  let stats = StatStore.getAll();
  return {
    characters: CharacterStore.getAll(),
    current: current,
    rolls: rolls,
    stats: stats.stats,
    availableNumbers: stats.availableNumbers
  };
}

let DWCharManagerApp = React.createClass({
  getInitialState() {
    CharacterActions.load()
    RollActions.load()
    return getAppState();
  },

  componentDidMount() {
    RollStore.addChangeListener(this._onChange);
    CharacterStore.addChangeListener(this._onChange);
    StatStore.addChangeListener(this._onChange)
  },

  componentWillUnmount() {
    RollStore.removeChangeListener(this._onChange);
    CharacterStore.removeChangeListener(this._onChange);
    StatStore.addChangeListener(this._onChange)
  },

  render() {
    let clearStyle = {
      clear: 'both'
    }
    return (
      <div>
        <CurrentCharacterDetails current={this.state.current} />
        <DiceBox current={this.state.current} rolls={this.state.rolls} />
        <div style={clearStyle}></div>
        <CharacterBox characters={this.state.characters} stats={this.state.stats} availableNumbers={this.state.availableNumbers} />
      </div>
    );
  },

  _onChange() {
    this.setState(getAppState());
  }
});

export default DWCharManagerApp;
