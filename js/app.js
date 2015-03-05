var React = require('react');
var CharacterBox = require('./components/CharacterBox.react');
var CurrentCharacterDetails = require('./components/CurrentCharacterDetails.react');
var DiceBox = require('./components/DiceBox.react');
React.render(
  <CharacterBox />,
  document.getElementById('character')
);
React.render(
  <CurrentCharacterDetails />,
  document.getElementById('current')
);
React.render(
  <DiceBox />,
  document.getElementById('rolls')
);
