import AppDispatcher from '../dispatcher/AppDispatcher';

export var RollActions = {
  create(data) {
    AppDispatcher.dispatch({
      actionType: 'ROLL',
      data: data
    });
  }
}
