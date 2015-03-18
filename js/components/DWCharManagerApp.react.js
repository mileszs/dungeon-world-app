import React from 'react';
import _ from 'lodash';
import CharacterActions from '../actions/CharacterActions';
import RollActions from '../actions/RollActions';
import CharacterBox from './CharacterBox.react';
import DiceBox from './DiceBox.react';
import CurrentCharacterDetails from './CurrentCharacterDetails.react';

import CharacterStore from '../stores/CharacterStore';
import RollStore from '../stores/RollStore';
import CharacterAPIUtils from '../utils/CharacterAPIUtils';
import RollAPIUtils from '../utils/RollAPIUtils';

// Create one top-level component that handles state, passes
// it as props to children. Single getAppState() should cover
// everything - characters, currentCharacter, rolls
function getAppState() {
  let current = CharacterAPIUtils.getCurrentChar();
  let rolls = RollAPIUtils.getCharacterRolls(current.id);
  return {
    characters: CharacterAPIUtils.getAll(),
    current: current,
    rolls: rolls
  };
}

let DWCharManagerApp = React.createClass({
  getInitialState() {
    return getAppState();
  },

  componentDidMount() {
    RollStore.addChangeListener(this._onChange);
    CharacterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    RollStore.removeChangeListener(this._onChange);
    CharacterStore.removeChangeListener(this._onChange);
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
    );
  },

  _onChange() {
    this.setState(getAppState());
  }
});

export default DWCharManagerApp;
