import AppDispatcher from '../dispatcher/AppDispatcher';
import RollAPIUtils from '../utils/RollAPIUtils';

let RollActions = {
  create(data) {
    RollAPIUtils.create(data.character, data.action, function(data) {
      AppDispatcher.dispatch({
        actionType: 'NEW_ROLL',
        roll: data.roll
      });
    });
  },

  load(data) {
    RollAPIUtils.getCharacterRolls(data.characterId, this.receiveAll);
    AppDispatcher.dispatch({
      actionType: 'LOADING_ROLL_HISTORY'
    });
  },

  receiveAll(data) {
    AppDispatcher.dispatch({
      actionType: 'LOADED_ROLL_HISTORY',
      rolls: data.rolls
    });
  }
}

export default RollActions;
