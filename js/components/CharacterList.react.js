import React from 'react';
import _ from 'lodash';
import {ListGroup, ListGroupItem, DropdownButton, MenuItem} from 'react-bootstrap'
import CharacterActions from '../actions/CharacterActions';

let CharacterList = React.createClass({
  render() {
    let characterItems = [];
    let buttonTitle = this.props.currentChar ? this.props.currentChar.name : 'No Characters Available'
    let active = this.props.currentChar && this.props.characters[key] ? this.props.currentChar.id === this.props.characters[key].id : false
    if (!_.isUndefined(this.props.currentChar)) {
    }
    for (var key in this.props.characters) {
      characterItems.push(<CharacterItem key={key} character={this.props.characters[key]} active={active} />);
    }
    return (
      <div id="character-list" className="col-xs-12">
        <DropdownButton title={buttonTitle} bsSize='large'>
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
