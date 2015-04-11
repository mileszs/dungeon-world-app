import AppDispatcher from '../dispatcher/AppDispatcher';
import _ from 'lodash';
import Character from '../models/Character.js';
import Events from 'events';
import assign from 'object-assign';
let EventEmitter = Events.EventEmitter;

let CHANGE_EVENT = 'change';

let characters = {};
let current = {};

let CharacterStore = assign({}, EventEmitter.prototype, {
  getAll() {
    return characters;
  },

  current() {
    if (_.isEmpty(current)) {
      let characterAry = [];
      for (var key in characters) {
        characterAry.push(characters[key]);
      }
      current = characterAry[characterAry.length-1];
    }
    return current;
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
  switch(action.actionType) {
    case 'SWITCH_CHAR':
      current = characters[action.characterId];
      CharacterStore.emitChange();
      break;
    case 'NEW_CHAR':
      characters[action.data.character.id] = action.data.character;
      current = action.data.character;
      CharacterStore.emitChange();
      break;
    case 'LOADED_CURRENT_CHAR':
      current = characters[action.characterId];
      CharacterStore.emitChange();
      break;
    case 'LOADED_ALL_CHARS':
      characters = action.characters;
      CharacterStore.emitChange();
      break;
    default:
      // no op
  }
});

export default CharacterStore;
