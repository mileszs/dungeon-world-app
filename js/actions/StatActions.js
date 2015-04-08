import AppDispatcher from '../dispatcher/AppDispatcher';

let StatActions = {
  drop(data) {
    AppDispatcher.dispatch({
      actionType: 'STAT_DROPPED',
      attr: data.attr,
      num: data.num
    });
  }
}

export default StatActions;
