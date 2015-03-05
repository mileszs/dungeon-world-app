var AppDispatcher = require('../dispatcher/AppDispatcher');
var Character = require('../models/Character.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _characters = {};

function create(attrs) {
  var character = new Character(attrs.name, attrs);
  _characters[character.id] = character;
  localStorage.setItem('characters', JSON.stringify(_characters));
}

function update(id, updates) {
}

function destroy(id) {
}

function destroyAll() {
}

var CharacterStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    var retrievedCharacters = localStorage.getItem('characters');

    if (retrievedCharacters !== undefined) {
      _characters = JSON.parse(retrievedCharacters);
    } else {
      _characters = {};
    }
    return _characters;
  },

  current: function(id) {
    var chars = this.getAll();
    if (id === undefined) {
      var characterAry = [];
      for (var key in chars) {
        characterAry.push(chars[key]);
      }
      return characterAry[characterAry.length-1];
    } else {
      chars[id];
    }
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
  var data;

  switch(action.actionType) {
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

    case 'SWITCH_CURRENT':
      switchCurrent(action.id);
      CharacterStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = CharacterStore;
