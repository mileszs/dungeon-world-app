import AppDispatcher from '../dispatcher/AppDispatcher';
import Character from '../models/Character.js';
import Events from 'events';
import assign from 'object-assign';
let EventEmitter = Events.EventEmitter;

let CHANGE_EVENT = 'change';

let _characters = {};
let _current = {};

function switchChar(id) {
  _current = _characters[id]
  localStorage.setItem('currentCharacter', JSON.stringify(_current));
  return _current;
}

function create(attrs) {
  let character = new Character(attrs.name, attrs);
  _characters[character.id] = character;
  localStorage.setItem('characters', JSON.stringify(_characters));
}

function update(id, updates) {
}

function destroy(id) {
}

function destroyAll() {
}

let CharacterStore = assign({}, EventEmitter.prototype, {
  getAll() {
    let retrievedCharacters = localStorage.getItem('characters');

    if (retrievedCharacters !== undefined) {
      _characters = JSON.parse(retrievedCharacters);
    } else {
      _characters = {};
    }
    return _characters;
  },

  current() {
    if (_current && Object.getOwnPropertyNames(_current).length > 0) {
      return _current;
    } else if (localStorage.getItem('currentCharacter') !== undefined) {
      _current = JSON.parse(localStorage.getItem('currentCharacter'));
      return _current;
    } else {
      let chars = this.getAll();
      let characterAry = [];
      for (var key in chars) {
        characterAry.push(chars[key]);
      }
      return characterAry[characterAry.length-1];
    }
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  let data;

  switch(action.actionType) {
    case 'SWITCH_CHAR':
      switchChar(action.id)
      CharacterStore.emitChange();
      break;

    case 'CREATE':
      data = action.data;
      if (Object.getOwnPropertyNames(data).length > 0) {
        create(data);
      }
      CharacterStore.emitChange();
      break;

    case 'UPDATE':
      // data = action.data;
      // if (Object.getOwnPropertyNames(data).length > 0) {
      //   update(action.id, data);
      // }
      CharacterStore.emitChange();
      break;

    case 'DESTROY':
      destroy(action.id);
      CharacterStore.emitChange();
      break;

    default:
      // no op
  }
});

export default CharacterStore;
