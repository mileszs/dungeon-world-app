var AppDispatcher = require('../dispatcher/AppDispatcher');
var Roll = require('../models/Roll');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _rolls = [];

function create(data) {
  var roll = new Roll(data.character, data.action);
  _rolls.push(roll);
  localStorage.setItem('rolls', JSON.stringify(_rolls));
}

var RollStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    var retrievedRolls = localStorage.getItem('rolls');
    _rolls = JSON.parse(retrievedRolls) || [];
    if (Object.getOwnPropertyNames(_rolls).length == 0) {
      _rolls = [];
    }
    return _rolls;
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
    case 'ROLL':
      data = action.data;
      if (Object.getOwnPropertyNames(data).length > 0) {
        create(data);
      }
      RollStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = RollStore;
