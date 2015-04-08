import _ from 'lodash';
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitterLib from 'events'
let EventEmitter = EventEmitterLib.EventEmitter;

import assign from 'object-assign';

let CHANGE_EVENT = 'change';

const statNumbers = ['16', '15', '13', '12', '9', '8'];

let stats = {
  str: null,
  dex: null,
  con: null,
  cha: null,
  int: null,
  wis: null
};

let availableNumbers = statNumbers;

let StatStore = assign({}, EventEmitter.prototype, {
  getAll() {
    return {stats, availableNumbers};
  },

  reset() {
    _.forEach(stats, (val, key) => {
      stats[key] = null
    })
    availableNumbers = statNumbers
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
    case 'STAT_DROPPED':
      stats[action.attr] = action.num;
      availableNumbers = _.difference(statNumbers, _.values(stats));
      StatStore.emitChange();
      break;
    case 'NEW_CHAR':
      StatStore.reset()
      StatStore.emitChange();
      break;
    default:
      // no op
  }
});

export default StatStore
