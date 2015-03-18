import AppDispatcher from '../dispatcher/AppDispatcher';
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
      current = action.character;
      CharacterStore.emitChange();
      break;
    case 'NEW_CHAR':
      characters.push(action.character);
      CharacterStore.emitChange();
      break;
    case 'LOADED_CURRENT_CHAR':
      current = action.character;
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
