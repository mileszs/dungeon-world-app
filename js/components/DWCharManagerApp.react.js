import React from 'react';
import _ from 'lodash';
import CharacterStore from '../stores/CharacterStore';
import RollStore from '../stores/RollStore';
import CharacterBox from './CharacterBox.react';
import DiceBox from './DiceBox.react';
import CurrentCharacterDetails from './CurrentCharacterDetails.react';

// Create one top-level component that handles state, passes
// it as props to children. Single getAppState() should cover
// everything - characters, currentCharacter, rolls
function getAppState() {
  let current = CharacterStore.current();
  let rolls = RollStore.getAll();
  return {
    characters: CharacterStore.getAll(),
    current: current,
    rolls: rolls
  };
}

let DWCharManagerApp = React.createClass({
  getInitialState: function() {
    return getAppState();
  },

  render: function() {
    let clearStyle = {
      clear: 'both'
    }
    return (
      <div>
        <CurrentCharacterDetails />
        <DiceBox />
        <div style={clearStyle}></div>
        <CharacterBox />
      </div>
    );
  }
});
export default DWCharManagerApp;
