import React from 'react';
import CharacterStore from '../stores/CharacterStore';
import CharacterActions from '../actions/CharacterActions';

function getCurrentCharacterState() {
  var current = CharacterStore.current();
  return {
    current: current,
  };
}

let CurrentCharacterDetails = React.createClass({
  getInitialState() {
    return getCurrentCharacterState();
  },

  componentDidMount() {
    CharacterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CharacterStore.removeChangeListener(this._onChange);
  },

  render() {
    if (this.state.current === undefined || this.state.current === null) {
      return null;
    } else {
      return (
        <div id="current">
          <h2>Character Stats</h2>
          <h3>{this.state.current.name}</h3>
          <ul>
            <li><strong>STR</strong>: {this.state.current.str}</li>
            <li><strong>DEX</strong>: {this.state.current.dex}</li>
            <li><strong>CON</strong>: {this.state.current.con}</li>
            <li><strong>CHA</strong>: {this.state.current.cha}</li>
            <li><strong>INT</strong>: {this.state.current.int}</li>
            <li><strong>WIS</strong>: {this.state.current.wis}</li>
          </ul>
        </div>
      );
    }
  },

  _onChange() {
    this.setState(getCurrentCharacterState());
  }
});

export default CurrentCharacterDetails;
