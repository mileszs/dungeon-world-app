import React from 'react';
import _ from 'lodash';
import {ListGroup, ListGroupItem, DropdownButton, MenuItem} from 'react-bootstrap'
import CharacterActions from '../actions/CharacterActions';

let CharacterList = React.createClass({
  render() {
    var characterItems = [];
    for (var key in this.props.characters) {
      characterItems.push(<CharacterItem key={key} character={this.props.characters[key]} active={this.props.currentChar.id === this.props.characters[key].id} />);
    }
    return (
      <div id="character-list" className="col-xs-12">
        <DropdownButton title={this.props.currentChar.name} bsSize='large'>
          {characterItems}
        </DropdownButton>
      </div>
    );
  }
});

let CharacterItem = React.createClass({
  render() {
    return (
      <MenuItem active={this.props.active} onClick={this.handleClick}>{this.props.character.name}</MenuItem>
    );
  },

  handleClick(e) {
    CharacterActions.switchChar(this.props.character.id);
  }
});

export default CharacterList
