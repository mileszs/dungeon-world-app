import _ from 'lodash';
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitterLib from 'events'
let EventEmitter = EventEmitterLib.EventEmitter;

import assign from 'object-assign';

let CHANGE_EVENT = 'change';

let rolls = [];

let RollStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return rolls;
  },

  getCharacterRolls(characterId) {
    rolls = _.filter(rolls, function(roll) { 
      return roll.character.id === characterId;
    });
    return rolls;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case 'NEW_ROLL':
      rolls.push(action.roll);
      RollStore.emitChange();
      break;
    case 'LOADED_ROLL_HISTORY':
      rolls = action.rolls;
      RollStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = RollStore;
