import alt from '../alt'
import CharacterAPIUtils from '../utils/CharacterAPIUtils';
import router from '../router'

class CharacterActions {
  create(data) {
    CharacterAPIUtils.create(data)
      .then((character) => {
        this.dispatch({
          character: character
        });
        router.transitionTo('/')
      })
  }

  switchChar(id) {
    this.dispatch({
      characterId: id
    });
  }

  load(data) {
    this.dispatch();
    CharacterAPIUtils.getAll()
      .then((characters) => {
        this.actions.receiveAll(characters)
      })
  }

  receiveAll(characters) {
    this.dispatch(characters)
  }

  remove(id) {
    this.dispatch(id)
    CharacterAPIUtils.remove(id)
  }
}

export default alt.createActions(CharacterActions)
