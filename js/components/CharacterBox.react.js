import React from 'react';
import _ from 'lodash';
import CharacterList from './CharacterList.react';
import CharacterForm from './CharacterForm.react';
import Draggable from './Draggable.react';

let CharacterBox = React.createClass({
  render() {
    return (
      <div id="characters">
        <CharacterList characters={this.props.characters} />
        <div className="clear"></div>
      </div>
    );
  },
});

export default CharacterBox;
