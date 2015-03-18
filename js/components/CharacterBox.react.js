import React from 'react';
import _ from 'lodash';
import CharacterStore from '../stores/CharacterStore';
import CharacterActions from '../actions/CharacterActions';

let CharacterBox = React.createClass({
  render() {
    return (
      <div id="characters">
        <CharacterList characters={this.props.characters} />
        <CharacterForm />
        <div id="character-validation-messages">{'\u0020'}</div>
        <div className="clear"></div>
      </div>
    );
  },
});

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
  handleClick(e) {
    e.preventDefault();
    var id = e.target.dataset.charId;
    CharacterActions.switchChar(id);
  },

  render() {
    return (
      <li>
        <a href="#" onClick={this.handleClick} data-char-id={this.props.character.id}>{this.props.character.name}</a>
      </li>
    );
  }
});

let CharacterForm = React.createClass({
  handleSubmit(e) {
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

  render() {
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
            attrs.map(function(attr, index) {
              return (
                <StatSelect key={`select${index}`} available_options={options} attr={attr} />
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

  _validCharacter() {
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

let StatSelect = React.createClass({
  render() {
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

export default CharacterBox;
