import React from 'react';
import CharacterStore from '../stores/CharacterStore';
import CharacterActions from '../actions/CharacterActions';

let CurrentCharacterDetails = React.createClass({
  render() {
    if (this.props.current === undefined || this.props.current === null) {
      return null;
    } else {
      return (
        <div id="current">
          <h2>Character Stats</h2>
          <h3>{this.props.current.name}</h3>
          <ul>
            <li><strong>STR</strong>: {this.props.current.str}</li>
            <li><strong>DEX</strong>: {this.props.current.dex}</li>
            <li><strong>CON</strong>: {this.props.current.con}</li>
            <li><strong>CHA</strong>: {this.props.current.cha}</li>
            <li><strong>INT</strong>: {this.props.current.int}</li>
            <li><strong>WIS</strong>: {this.props.current.wis}</li>
          </ul>
        </div>
      );
    }
  },
});

export default CurrentCharacterDetails;
