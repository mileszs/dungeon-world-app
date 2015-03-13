import AppDispatcher from '../dispatcher/AppDispatcher';

export var CharacterActions = {
  create(data) {
    AppDispatcher.dispatch({
      actionType: 'CREATE',
      data: data
    });
  },

  update(id, data) {
    AppDispatcher.dispatch({
      actionType: 'UPDATE',
      id: id,
      data: data
    });
  },

  destroy(id) {
    AppDispatcher.dispatch({
      actionType: 'DESTROY',
      id: id
    });
  },

  switchChar(id) {
    AppDispatcher.dispatch({
      actionType: 'SWITCH_CHAR',
      id: id
    });
  }
}
