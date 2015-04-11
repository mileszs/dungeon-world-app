import AppDispatcher from '../dispatcher/AppDispatcher';

let StatActions = {
  drop(data) {
    AppDispatcher.dispatch({
      actionType: 'STAT_DROPPED',
      attr: data.attr,
      num: data.num
    });
  },

  reset() {
    AppDispatcher.dispatch({
      actionType: 'FORM_RESET',
    })
  }
}

export default StatActions;
