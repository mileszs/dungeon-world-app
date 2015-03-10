var React = require('react');
var CharacterStore = require('../stores/CharacterStore');
var RollStore = require('../stores/RollStore');
var CharacterBox = require('./CharacterBox.react');
var DiceBox = require('./DiceBox.react');
var CurrentCharacterDetails = require('./CurrentCharacterDetails.react');

// Create one top-level component that handles state, passes
// it as props to children. Single getAppState() should cover
// everything - characters, currentCharacter, rolls
function getAppState() {
  var current = CharacterStore.current();
  var rolls = RollStore.getAll();
  return {
    characters: CharacterStore.getAll(),
    current: current,
    rolls: rolls
  };
}

var DWCharManagerApp = React.createClass({
  getInitialState: function() {
    return getAppState();
  },

  render: function() {
    clearStyle = {
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
module.exports = DWCharManagerApp;
