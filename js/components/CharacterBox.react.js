var React = require('react');
var _ = require('lodash');
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
      <div id="characters">
        <CharacterList characters={this.state.characters} />
        <CharacterForm />
        <div id="character-validation-messages">{'\u0020'}</div>
        <div className="clear"></div>
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
      <div id="character-list">
        <h3>Characters</h3>
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
    CharacterActions.switchChar(id);
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
    var msg = this._validCharacter();
    if (_.isEmpty(msg)) {
      $('#character-validation-messages').html('');
      _.each($('#character-form form input, #character-form form select'), function(el) {
        data[$(el).prop('name')] = $(el).val().trim();
        $(el).val('');
      });
      CharacterActions.create(data);
    } else {
      $('#character-validation-messages').html(msg);
    }
  },

  render: function() {
    var attrs = ['str', 'dex', 'con', 'cha', 'wis', 'int'];
    var options = ['16', '15', '13', '12', '9', '8'];
    return (
      <div id="character-form">
        <h3>New Character</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-textfield">
            <label htmlFor="name">Name</label>
            <input type="text" ref="name" name="name" id="name" size="20" />
          </div>
          {
            _.map(attrs, function(attr) {
              return (
                <StatSelect available_options={options} attr={attr} />
              );
            })
          }
          <div className="form-submit">
            <input type="submit" name="submit" value="Save" />
          </div>
        </form>
      </div>
    );
  },

  _validCharacter: function() {
    var name = $('#name').val();
    var values = _.map($('#character-form select'), function(el) { return $(el).val(); });
    var msg = '';
    if (_.isEmpty(name)) {
      msg = msg + 'You must provide a name for your character.'
    }
    if (_.compact(values).length < 6) {
      msg = msg + 'You must pick a value for each attribute.'
    }
    if (values.length > _.uniq(values).length) {
      msg = msg + ' Each stat number must be used only once.';
    }
    return msg;
  },
});

var StatSelect = React.createClass({
  render: function() {
    var options = this.props.available_options;
    var attr = this.props.attr;
    return (
      <div className="form-select">
        <label htmlFor={attr}>{attr.toUpperCase()}</label>
        <select ref={attr} id={attr} name={attr} defaultValue="">
          <option value="" disabled></option>
          {
            options.map(function(option, index){
              return <option key={index} value={option}>{option}</option>
          })}
        </select>
      </div>
    );
  }
});

module.exports = CharacterBox;
