import React from 'react';
import _ from 'lodash';

import CharacterActions from '../actions/CharacterActions';
import RollActions from '../actions/RollActions';
import CharacterBox from './CharacterBox.react';
import DiceBox from './DiceBox.react';
import CurrentCharacterDetails from './CurrentCharacterDetails.react';

import CharacterStore from '../stores/CharacterStore';
import RollStore from '../stores/RollStore';

function getDashboardState() {
  let current = CharacterStore.current()
  let rolls = []
  if (current) {
    rolls = RollStore.getCharacterRolls(current.id);
  }
  return {
    characters: CharacterStore.getAll(),
    current: current,
    rolls: rolls,
  };
}

let Dashboard = React.createClass({
  getInitialState() {
    CharacterActions.load()
    RollActions.load()
    return getDashboardState()
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
        <CharacterBox characters={this.state.characters} />
      </div>
    )
  },

  componentDidMount() {
    RollStore.addChangeListener(this._onChange);
    CharacterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    RollStore.removeChangeListener(this._onChange);
    CharacterStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(getDashboardState());
  }
})

export default Dashboard
