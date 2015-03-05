var AppDispatcher = require('../dispatcher/AppDispatcher');

var RollActions = {
  create: function(data) {
    AppDispatcher.dispatch({
      actionType: 'ROLL',
      data: data
    });
  }
}

module.exports = RollActions;
