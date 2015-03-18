import AppDispatcher from '../dispatcher/AppDispatcher';
import RollActions from '../actions/RollActions';
import CharacterAPIUtils from '../utils/CharacterAPIUtils';

let CharacterActions = {
  create(data) {
    CharacterAPIUtils.create(data, function(data) {
      AppDispatcher.dispatch({
        actionType: 'NEW_CHAR',
        data: data
      });
    })
  },

  switchChar(id) {
    CharacterAPIUtils.setCurrent(id, function(data) {
      AppDispatcher.dispatch({
        actionType: 'SWITCH_CHAR',
        character: data.character
      });
    });
    RollActions.load({characterId: id});
  },

  load(data) {
    CharacterAPIUtils.getCurrentChar(this.receiveCurrentChar);
    CharacterAPIUtils.getAll(this.receiveAll);
    AppDispatcher.dispatch({
      actionType: 'LOADING_CURRENT_CHAR'
    });
  },

  receiveCurrentChar(data) {
    AppDispatcher.dispatch({
      actionType: 'LOADED_CURRENT_CHAR',
      character: data.character
    });
  },

  receiveAll(data) {
    AppDispatcher.dispatch({
      actionType: 'LOADED_ALL_CHARS',
      characters: data.characters
    });
  }
}

export default CharacterActions;
