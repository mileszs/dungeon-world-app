import React from 'react';
import _ from 'lodash';
import CharacterActions from '../actions/CharacterActions';

let CharacterList = React.createClass({
  render() {
    var characterItems = [];
    for (var key in this.props.characters) {
      characterItems.push(<CharacterItem key={key} character={this.props.characters[key]} />);
    }
    return (
      <div id="character-list">
        <h3>Characters</h3>
        <ul>
          {characterItems}
        </ul>
      </div>
    );
  }
});

let CharacterItem = React.createClass({
  render() {
    return (
      <li>
        <a href="#" onClick={this.handleClick}>{this.props.character.name}</a>
      </li>
    );
  },

  handleClick(e) {
    e.preventDefault();
    CharacterActions.switchChar(this.props.character.id);
  }
});

export default CharacterList
