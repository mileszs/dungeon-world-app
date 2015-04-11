import AppDispatcher from '../dispatcher/AppDispatcher';
import RollActions from '../actions/RollActions';
import CharacterAPIUtils from '../utils/CharacterAPIUtils';
import router from '../router'

let CharacterActions = {
  create(data) {
    CharacterAPIUtils.create(data, function(data) {
      AppDispatcher.dispatch({
        actionType: 'NEW_CHAR',
        data: data
      });
      router.transitionTo('/')
    })
  },

  switchChar(id) {
    AppDispatcher.dispatch({
      actionType: 'SWITCH_CHAR',
      characterId: id
    });
    RollActions.load({characterId: id});
  },

  load(data) {
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
