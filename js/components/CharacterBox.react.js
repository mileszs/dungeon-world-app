var React = require('react');
var CharacterStore = require('../stores/CharacterStore');
var CharacterActions = require('../actions/CharacterActions');

// Create one top-level component that handles state, passes
// it as props to children. Single getAppState() should cover
// everything - characters, currentCharacter, rolls
function getCharacterState() {
  return {
    characters: CharacterStore.getAll()
  };
}

var CharacterBox = React.createClass({
  getInitialState: function() {
    return getCharacterState();
  },

  componentDidMount: function() {
    CharacterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CharacterStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="character-box">
        <h2>Characters</h2>
        <CharacterList characters={this.state.characters} />
        <CharacterForm />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getCharacterState());
  }
});

var CharacterList = React.createClass({
  render: function() {
    var characterItems = [];
    for (var key in this.props.characters) {
      characterItems.push(<CharacterItem character={this.props.characters[key]} />);
    }
    return (
      <div className="character-list">
        <ul>
          {characterItems}
        </ul>
      </div>
    );
  }
});

var CharacterItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    var id = e.target.dataset.charId;
    CharacterActions.switchCurrent(id);
  },

  render: function() {
    return (
      <li>
        <a href="#" onClick={this.handleClick} data-char-id={this.props.character.id}>{this.props.character.name}</a>
      </li>
    );
  }
});

var CharacterForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var data = {};
    for (var el in this.refs) {
      if (this.refs.hasOwnProperty(el)) {
        data[el] = this.refs[el].getDOMNode().value.trim();
        this.refs[el].getDOMNode().value = '';
      }
    }
    CharacterActions.create(data);
  },

  render: function() {
    return (
      <div className="dice-form">
        <h3>New Character</h3>
        <form onSubmit={this.handleSubmit}>
          <label for="name">Name</label>
          <input type="text" ref="name" name="name" id="name" size="20" />
          <br />
          <label for="str">STR</label>
          <input type="text" ref="str" name="str" id="str" size="2" />
          <br />
          <label for="dex">DEX</label>
          <input type="text" ref="dex" name="dex" id="dex" size="2" />
          <br />
          <label for="con">CON</label>
          <input type="text" ref="con" name="con" id="con" size="2" />
          <br />
          <label for="cha">CHA</label>
          <input type="text" ref="cha" name="cha" id="cha" size="2" />
          <br />
          <label for="wis">WIS</label>
          <input type="text" ref="wis" name="wis" id="wis" size="2" />
          <br />
          <label for="int">INT</label>
          <input type="text" ref="int" name="int" id="int" size="2" />
          <br />
          <input type="submit" name="submit" value="Save" />
        </form>
      </div>
    );
  }
});

module.exports = CharacterBox;
