var AppDispatcher = require('../dispatcher/AppDispatcher');

var CharacterActions = {
  create: function(data) {
    AppDispatcher.dispatch({
      actionType: 'CREATE',
      data: data
    });
  },

  update: function(id, data) {
    AppDispatcher.dispatch({
      actionType: 'UPDATE',
      id: id,
      data: data
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: 'DESTROY',
      id: id
    });
  },

  switchChar: function(id) {
    AppDispatcher.dispatch({
      actionType: 'SWITCH_CHAR',
      id: id
    });
  }
}

module.exports = CharacterActions;
